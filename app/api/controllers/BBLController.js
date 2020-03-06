import PaymentLog from '../../models/PaymentLog';
import PaymentConfig from '../../models/PaymentConfig';
import PaymentTransaction from '../../models/PaymentTransaction';
import {validationResult} from 'express-validator/check';
import {messageValidate} from '../../helpers/wrapValidateMessage';
import {checkTypeCard} from '../../helpers/checkTypeCard';
import axios from 'axios'
import { parseString } from 'xml2js'
import db from '../../../database/sql'
import FormData from 'form-data';
import httpStatus from 'http-status';
import moment from 'moment'
import paymentToken from '../../service/paymentToken';

let logger = require('../../../config/graylog').graylog;

const PAYMENT_CHANNEL_ID = 3

class BBLController {
    async creditList(req, res, next) {
        try {
            var dev = true
            var api = 'https://ipay.bangkokbank.com/b2c/eng/merchant/api/MemberPayApi.jsp'
            if(dev) {
                api = 'https://psipay.bangkokbank.com/b2c/eng/merchant/api/MemberPayApi.jsp'
            }

            const params = { 
                merchantId: '4952',
                merchantApiId: 'adminMer',
                password: 'Password123',
                actionType: 'QueryAccount',
                memberId: req.params.member_id,
            }

            const data = Object.entries(params)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join('&')

            return await axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data,
                url: api,
            })
            .then(response => {
                parseString(`<?xml version="1.0" encoding="UTF-8" ?>${response.data}`, function (err, result) {
                    if(err) return next(err)
                    if(typeof result.memberpayresponse.response[0].accounts != 'undefined') {
                        var creditList = [];
                        var existing = {};
                        var status = 200;
                        if(result.memberpayresponse.response[0].accounts.length > 0) {
                            result.memberpayresponse.response[0].accounts.forEach((val, index) => {
                                var creditType = val['accounttype'][0]
                                var creditNo = val['account'][0]
                                if(typeof existing[creditType] == 'undefined') {
                                    existing[creditType] = []
                                }
                                if(val['status'][0] == 'A' && existing[creditType].indexOf(creditNo) == -1) {
                                    existing[creditType].push(creditNo)

                                    creditList.push({
                                        account_id: val['accountId'][0],
                                        account_type: creditType,
                                        account_number: creditNo,
                                        token: val['statictoken'][0]
                                    })
                                }
                            })
                        }
                        var responseData = {
                            data: creditList,
                        }
                    } else {
                        var status = 200;
                        var responseData = {
                            data: []
                        }
                    }
                    return res.status(status).send(responseData)
                })
            })
            .catch(err => {
                return next(err);
            })
        } catch (err) {
            return next(err);
        }
    };
    async BBLcallback(req, res, next) {
        try{
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(200).json(response);
            }

            let params = req.body;
            var status = 'fail'

            if( params.successcode == '0' ){
                status = 'success';
            }

            const ORDER_ID = params.Ref
            const PAYMENT_TRANSACTION_ID = params.orderRef1
            const OUTLET_ID = params.orderRef2
            const TERMINAL_ID = params.orderRef3

            // keep payment_log in graylog
            logger.info('BBL: getCallback', 'BBL: getCallback', {
                levelName: 'info',
                endpoint: `${process.env.APP_URL}`,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            //find payment_transaction
            let paymentTransaction = await PaymentTransaction.getByTransactionID(PAYMENT_TRANSACTION_ID);
            if (paymentTransaction.error) {
                let response = {
                    "messages": httpStatus[paymentTransaction.status_code],
                    "detail": paymentTransaction.error
                };
                return res.status(200).send(response.detail);
            }
            let transId = paymentTransaction.id
            //update payment_transaction
            let update_data = {
                'status': status,
                'payment_reference': params.PayRef,
                'updated_at': moment().format("YYYY-MM-DD HH:mm:ss")
            }
            await PaymentTransaction.update(transId, update_data);
            
            // keep payment_log
            let log = {
                'order_id': ORDER_ID,
                'transaction_id': PAYMENT_TRANSACTION_ID,
                'request': null,
                'response': JSON.stringify(params),
                'status': status,
            }
            await PaymentLog.create(log);

            
            //get payment_config
            let getConfig = await PaymentConfig.getConfig( OUTLET_ID, TERMINAL_ID, PAYMENT_CHANNEL_ID );
            if(getConfig.error){ //has error
                logger.error('BBL: getPaymentConfigError', 'BBL: getPaymentConfigError', {
                    levelName: 'error',
                    endpoint: `${process.env.APP_URL}`,
                    version: '1.0',
                    logType: 'out_request',
                    request: {
                        outlet_id: OUTLET_ID,
                        terminal_id: TERMINAL_ID,
                        payment_channel_id: PAYMENT_CHANNEL_ID
                    },
                    response: getConfig
                }); 
                return res.status(200).send(getConfig.error);
            }

            //classify card_type
            var card_type = await checkTypeCard(params.cc0104, params.cc1316)
            if(card_type == false){
                let response = {
                    "messages": 'Number credit card invalid'
                };
                return res.status(200).send(response);
            }
            
            //send data to return_uri
            var dataPost = {
                order_id: ORDER_ID,
                customer_id: params.mpMemberId,
                customer_name: params.Holder,
                // customer_mobile: undefined,
                terminal_no: paymentTransaction.terminal_no,
                payment_transaction_id: PAYMENT_TRANSACTION_ID,
                card_number: `${params.cc0104}********${params.cc1316}`,
                card_type: card_type,
                request_amount: params.Amt,
                status: status,
                log_response: JSON.stringify(params),
                params: {
                    transId: transId
                }
            }

            //get token
            const payToken = new paymentToken()
            let token = await payToken.getToken();
            
            const headers = {
                'Content-Type': 'application/json',
                'Accept-Language': '*',
                'Authorization': `Bearer ${token}`
            }
            await axios.post(getConfig.return_uri, dataPost, {
                headers: headers
            })
            .then(function (response) {
                return setTransactionSync(transId)
            })
            .catch(function (error) {
                logger.error('BBL: sendToUpdateOrderError', 'BBL: sendToUpdateOrderError', {
                    levelName: 'error',
                    endpoint: error.config.url,
                    version: '1.0',
                    logType: 'in_request',
                    request: dataPost
                });
                return res.status(200).send(error.response.data.errors.message);
                
            });
            return res.send('OK')
            
        } catch (err) {
            return next(err);
        }
        
    };

    async creditToken(req, res, next) {
        try {
            var dev = true
            var api = 'https://ipay.bangkokbank.com/b2c/eng/merchant/api/MemberPayApi.jsp'
            if(dev) {
                api = 'https://psipay.bangkokbank.com/b2c/eng/merchant/api/MemberPayApi.jsp'
            }

            const params = { 
                merchantId: '4952',
                merchantApiId: 'adminMer',
                password: 'Password123',
                actionType: 'GenerateToken',
                memberId: req.params.member_id,
                orderRef: req.body.order_id,
                currCode: req.body.currency,
                amount: req.body.amount,
                staticToken: req.body.token,
            }

            const data = Object.entries(params)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join('&')

            return await axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data,
                url: api,
            })
            .then(response => {
                parseString(`<?xml version="1.0" encoding="UTF-8" ?>${response.data}`, function (err, result) {
                    if(err) return res.status(500).send({
                        errors: {
                            message: 'BBL Request fail',
                            code: 500,
                        }
                    })
                    
                    var status = 200;
                    if(typeof result.memberpayresponse.response[0] != 'undefined') {
                        const response = result.memberpayresponse.response[0]
                        var responseData = {
                            data: {
                                token: response.token[0],
                                generatetime: response.generatetime[0],
                                timeout: response.timeout[0],
                            },
                        }
                    } else {
                        var responseData = {
                            data: {}
                        }
                    }
                    return res.status(status).send(responseData)
                })
            })
            .catch(err => {
                return res.status(500).send({
                    errors: {
                        message: 'BBL Request Token Fail',
                        code: 500,
                    }
                })
            })
        } catch (err) {
            logger.error('BBL: StaticToken Req Error', 'BBL: StaticToken Req Error', {
                levelName: 'error',
                endpoint: `${process.env.APP_URL}`,
                version: '1.0',
                logType: 'BBL Request',
                error_message: err.message
            })
            return res.status(500).send({
                errors: {
                    message: 'internal server error',
                    code: 500,
                }
            })
        }
    }
    async voidOrder(payment_reference, order_id, transaction_id) {
        try {
            var dev = true
            var api = 'https://ipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp'
            if(dev) {
                api = 'https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp'
            }

            const params = { 
                merchantId: '4952',
                loginId: 'adminMer',
                password: 'Password123',
                actionType: 'Void',
                payRef: payment_reference
            }

            const data = Object.entries(params)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join('&')

            return await axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data,
                url: api,
            })
            .then(response => {
                    var output = {};
                    var vars = response.data.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split('=');
                        output[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
                    }
                    //save log
                    logger.info('BBL: voidOrder', 'BBL: voidOrder', {
                        levelName: 'info',
                        endpoint: api,
                        version: '1.0',
                        logType: 'out_request',
                        request: params,
                        response: output
                    });
                    // keep payment_log
                    let log = {
                        'order_id': order_id,
                        'transaction_id': transaction_id,
                        'request': JSON.stringify(params),
                        'response': JSON.stringify(output),
                        'status': 'cancel',
                    }
                    PaymentLog.create(log);

                    if (output.resultCode == -1) {
                        var responseData = {
                            status: 406,
                            error: output
                        }
                        throw responseData
                    } else {
                        //success void
                        return output
                    }
            })
        } catch (err) {
            throw err
            // return next(err);
        }
    }

    
}

const setTransactionSync = (id) => {
    return new Promise((resolve, reject) => {
        let transaction = PaymentTransaction.update( id , {
            sync_status: 'Y'
        });
        if (transaction.error) {
            let response = {
                "messages": httpStatus[transaction.status_code],
                "detail": transaction.error
            };
            return reject(response)
        } else {
            return resolve()
        }
    })
}

export default new BBLController();