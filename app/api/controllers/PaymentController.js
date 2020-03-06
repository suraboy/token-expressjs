import {validationResult} from 'express-validator/check';
import {messageValidate} from '../../helpers/wrapValidateMessage';
import {paginate, getFullUrl, getOptions} from '../../helpers/pagination';
import dotenv from 'dotenv';
import models from '../../models/mysql';
import BBLController from './BBLController';
import curlWeOmni from '../../helpers/curlWeOmni';
import weomiOnline from "../../service/weomiOnline";
import {parseResponse} from "../../helpers/parseResponse";

var moment = require('moment');
let logger = require('./../../../config/graylog').graylog;
dotenv.config();

let additionalFields = {
    levelName: 'info',
    endpoint: '',
    version: '1.0',
    logType: 'out_response',
    response: {},
}

class PaymentController {

    async getTrueMoneyWalletOfflineTransactions(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const options = getOptions(req)

            options['where']['payment_type'] = 'offline'

            const {docs, pages, total} = await models.TrueMoneyPaymentTransaction.paginate(options);

            const count = Object.keys(docs).length;

            let pagination = paginate(getFullUrl(req), count, pages, total, options.paginate, options.page)

            let response = {
                data: docs,
                meta: pagination,
                total: {}
            }

            if (req.query.total && req.query.total === 'request_amount') {
                const key = req.query.total
                response['total'][key] = sum(docs, key)
            } else {
                delete response['total']
            }

            return res.status(200).send(response);

        } catch (err) {
            return next(err);
        }
    };

    async getTrueMoneyWalletOnlineTransactions(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const options = getOptions(req)

            options['where']['payment_type'] = 'online'

            const {docs, pages, total} = await models.TrueMoneyPaymentTransaction.paginate(options);

            const count = Object.keys(docs).length;

            let pagination = paginate(getFullUrl(req), count, pages, total, options.paginate, options.page)

            let response = {
                data: docs,
                meta: pagination,
                total: {}
            }

            if (req.query.total && req.query.total === 'request_amount') {
                const key = req.query.total
                response['total'][key] = sum(docs, key)
            } else {
                delete response['total']
            }

            return res.status(200).send(response);

        } catch (err) {
            return next(err);
        }
    };

    async createTrueMoneyWalletTransaction(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            let params = req.body;

            logger.info('WeOmniTransactionPayment: Request', 'WeOmniTransactionPayment: Request', {
                levelName: 'info',
                endpoint: `${process.env.APP_URL}`,
                version: '1.0',
                logType: 'in_request',
                request: params
            });

            params['oauth_client_id'] = params.client_id;
            params['isv_payment_ref'] = params.tx_ref_id;
            params['request_amount'] = params.amount;
            params['timestamp'] = moment().unix();
            params['log_response'] = JSON.stringify(params.log_response);

            const response = await models.TrueMoneyPaymentTransaction.create(params);

            let responseData = {
                "data": response
            }

            additionalFields['endpoint'] = `${process.env.APP_URL}`,
                additionalFields['response'] = responseData

            logger.info('WeOmniTransactionPayment: Response(Success)', 'WeOmniTransactionPayment: Response(Success)', additionalFields);

            return res.status(200).send(responseData);

        } catch (err) {
            return next(err);
        }
    };

    async getPaymentTransactions(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const options = getOptions(req)

            const {docs, pages, total} = await models.PaymentTransactions.paginate(options);

            const count = Object.keys(docs).length;

            let pagination = paginate(getFullUrl(req), count, pages, total, options.paginate, options.page)

            let response = {
                data: docs,
                meta: pagination,
                total: {}
            }

            if (req.query.total && req.query.total === 'request_amount') {
                const key = req.query.total
                response['total'][key] = sum(docs, key)
            } else {
                delete response['total']
            }

            return res.status(200).send(response);

        } catch (err) {
            return next(err);
        }
    };

    async getPaymentTransactionDetail(req, res, next) {
        /*Error Varidate 422*/
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        const paymentTransaction = await models.PaymentTransactions.findOne({
            "where": {
                "transaction_id": req.params.transaction_id
            }
        }).then(data => {
            if (data === null) {
                return res.status(404).json({
                    "errors": {
                        "status_code": 404,
                        "message": "Not found."
                    }
                });
            }
            return data.get({plain: true});
        });

        if (req.query.request_body === 'true') {
            const paymentConfigs = await models.PaymentConfigs.findOne({
                "where": {
                    "outlet_id": paymentTransaction.outlet_id,
                    "terminal_id": paymentTransaction.terminal_id,
                    "payment_channel_id": paymentTransaction.payment_channel_id
                }
            }).then(data => {
                if (data === null) {
                    return null;
                }
                return data.get({plain: true});
            });

            let configData = [];
            if (paymentConfigs != null) {
                configData = paymentConfigs.data_config;
            }
            paymentTransaction.request_body = configData;
        }


        let response = {
            data: paymentTransaction
        };

        return res.status(200).send(response);

    }

    async getCreditCardTransactionByOrderId(req, res, next){
        /*Error Varidate 422*/
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        const paymentTransaction = await models.PaymentTransactions.findOne({
            "where": {
                "order_id": req.params.order_id
            }
        }).then(data => {
            if (data === null) {
                return res.status(404).json({
                    "errors": {
                        "status_code": 404,
                        "message": "Not found."
                    }
                });
            }
            return data.get({plain: true});
        });

        if (req.query.request_body === 'true') {
            const paymentConfigs = await models.PaymentConfigs.findOne({
                "where": {
                    "outlet_id": paymentTransaction.outlet_id,
                    "terminal_id": paymentTransaction.terminal_id,
                    "payment_channel_id": paymentTransaction.payment_channel_id
                }
            }).then(data => {
                if (data === null) {
                    return null;
                }
                return data.get({plain: true});
            });

            let configData = [];
            if (paymentConfigs != null) {
                configData = paymentConfigs.data_config;
            }
            paymentTransaction.request_body = configData;
        }


        let response = {
            data: paymentTransaction
        };

        return res.status(200).send(response);
    }
    async createPaymentTransaction(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            let params = req.body;

            logger.info('createPaymentTransaction: Request', 'createPaymentTransaction: Request', {
                levelName: 'info',
                endpoint: `${process.env.APP_URL}`,
                version: '1.0',
                logType: 'in_request',
                request: params
            });

            // Default Data
            params['status'] = 'waiting';
            params['sync_status'] = 'N';
            params['transaction_id'] = moment().format('YYMMDDhhmmss') + params.order_no;

            delete params.order_no;

            const response = await models.PaymentTransactions.create(params);
            let responseData = {
                "data": response
            }

            additionalFields['endpoint'] = `${process.env.APP_URL}`
            additionalFields['response'] = responseData
            logger.info('createPaymentTransaction: Response(Success)', 'createPaymentTransaction: Response(Success)', additionalFields);

            return res.status(201).send(responseData);
        } catch (err) {
            return next(err);
        }
    }

    async getPaymentVoid(req, res, next) {
        /*Error Varidate 422*/
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        const paymentTransaction = await models.PaymentTransactions.findOne({
            "where": {
                "transaction_id": req.params.transaction_id
            }
        }).then(pay_trans => {
            if(pay_trans.payment_channel_id === 3 && pay_trans.status == 'success'){ //BBL
                if(pay_trans.payment_reference != undefined){
                    var result = BBLController.voidOrder(pay_trans.payment_reference, pay_trans.order_id, pay_trans.transaction_id);
                    result.then((data) => {
                        //update payment_transaction
                        let update_data = {
                            'status': 'cancel',
                            'updated_at': moment().format("YYYY-MM-DD HH:mm:ss")
                        }
                        pay_trans.update(update_data, {where: {id: pay_trans.id}})
                        
                        return res.status(200).json({
                            "status_code": 200,
                            "message": "Void successfully",
                            "ref": data.ref
                        });
                    })
                    result.catch((error) => {
                        return res.status(error.status).json({
                            "errors": {
                                "status_code": error.status,
                                "message": "BBL - "+error.error.errMsg
                            }
                        });
                    })
                } else {
                    return res.status(422).json({
                        "errors": {
                            "status_code": 422,
                            "message": "Invalid Payment Ref."
                        }
                    });
                }
            } else {
                return res.status(404).json({
                    "errors": {
                        "status_code": 404,
                        "message": "Not found."
                    }
                });
            }
        }).catch(error => {
            return res.status(404).json({
                "errors": {
                    "status_code": 404,
                    "message": error.response
                }
            });
        });
    }

    async testAuthenAcc(req,res,next){
        const endpoint = `${process.env.ACCOUNT_API_URL}v1/users`;
        const accessToken = req.cookies.act;
        let params = req.body;
        const response = await curlWeOmni.get(accessToken,endpoint, params);
        return res.status(response.status).send(parseResponse(response.data));
    }
}

const sum = (docs, key) => {
    return docs.reduce((a, b) => parseInt(a) + (parseInt(b[key]) || 0), 0);
}

const getMessageError = (messageError) => {

    return {
        "errors": {
            "status_code": 422,
            "message": "The gives data was invalid.",
            "errors": messageError
        }
    };
}

export default new PaymentController();