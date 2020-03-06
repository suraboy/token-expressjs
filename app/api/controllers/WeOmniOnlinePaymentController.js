import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';
import weomiOnline from './../../service/weomiOnline';
import dotenv from 'dotenv';
import {parseResponse} from "../../helpers/parseResponse";

let logger = require('./../../../config/graylog').graylog;
import {wrapErrorMessageWeOmni} from "./../../helpers/wrapErrorMessageWeOmni";

dotenv.config();

let additionalFields = {
    levelName: 'info',
    endpoint: '',
    version: '1.0',
    logType: 'out_response',
    response: {},
    error: {}
}

let responseData = {}

class WeOmniOnlinePaymentController {

    async requestOtp(req, res, next) {
        try {
            /*Error Validate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            /*End Error*/
            let params = req.body;

            const endpoint = `${process.env.RPP_PAYMENT_SERVICE}payment/api/wallet/otp`

            logger.info('WeOmniOnlinePaymentRequestOtp: Request', 'WeOmniOnlinePaymentRequestOtp: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            const response = await weomiOnline.post(`payment/api/wallet/otp`, params);
            additionalFields['endpoint'] = endpoint
            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOnlinePaymentRequestOtp: Response(Success)', 'WeOmniOnlinePaymentRequestOtp: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOnlinePaymentRequestOtp: Response(Error)', 'WeOmniOnlinePaymentRequestOtp: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));
        } catch (err) {
            return next(err);
        }
    };

    async verifyOtp(req, res, next) {
        try {
            // Error Validate 422
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            // Custom params for verify otp
            let params = {
                "otpCode": req.body.otp_code,
                "otpRef": req.body.otp_ref,
                "authCode": req.body.auth_code,
                "mobile": req.body.mobile
            }

            const endpoint = `${process.env.RPP_PAYMENT_SERVICE}payment/api/wallet/otp/verify`

            logger.info('WeOmniOnlinePaymentVerifyOtp: Request', 'WeOmniOnlinePaymentVerifyOtp: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            const response = await weomiOnline.post(`payment/api/wallet/otp/verify`, params);

            additionalFields['endpoint'] = endpoint

            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOnlinePaymentVerifyOtp: Response(Success)', 'WeOmniOnlinePaymentVerifyOtp: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOnlinePaymentVerifyOtp: Response(Error)', 'WeOmniOnlinePaymentVerifyOtp: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(response.response));

        } catch (err) {
            return next(err);
        }
    };

    async chargePayment(req, res, next) {
        try {
            // Error Validate 422
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            // Custom params for verify otp
            let params = {
                "merchantId": req.body.merchant_id,
                "outletId": req.body.outlet_id,
                "terminalId": req.body.terminal_id,
                "txRefId": req.body.tx_ref_id,
                "amount": req.body.amount,
                "channel": req.body.channel,
                "currency": req.body.currency,
                "description": req.body.description,
                "mobile": req.body.mobile,
                "name": req.body.name,
                "paymentMethod": req.body.payment_method,
                "tmnToken": req.body.tmn_token,
            }

            const endpoint = `${process.env.RPP_PAYMENT_SERVICE}payment/api/charge`

            logger.info('WeOmniOnlinePaymentChargePayment: Request', 'WeOmniOnlinePaymentChargePayment: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            //endpoint for charge payment tmn online
            const response = await weomiOnline.post(`payment/api/charge`, params);

            additionalFields['endpoint'] = endpoint
            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOnlinePaymentCharge: Response(Success)', 'WeOmniOnlinePaymentCharge: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOnlinePaymentCharge: Response(Error)', 'WeOmniOnlinePaymentCharge: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(response.response));

        } catch (err) {
            return next(err);
        }
    };

    async cancelPayment(req, res, next) {
        try {
            // Error Validate 422
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            // Custom params for verify otp
            let params = {
                "txRefId": req.body.tx_ref_id,
                "merchantId": req.body.merchant_id,
                "outletId": req.body.outlet_id,
                "terminalId": req.body.terminal_id
            }

            const endpoint = `${process.env.RPP_PAYMENT_SERVICE}payment/api/charge/cancel`

            logger.info('WeOmniOnlinePaymentCancel: Request', 'WeOmniOnlinePaymentCancel: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });
            //endpoint for cancel payment tmn online
            const response = await weomiOnline.post(`payment/api/charge/cancel`, params);

            additionalFields['endpoint'] = endpoint
            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOnlinePaymentCancel: Response(Success)', 'WeOmniOnlinePaymentCancel: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOnlinePaymentCancel: Response(Error)', 'WeOmniOnlinePaymentCancel: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(response.response));
        } catch (err) {
            return next(err);
        }
    };
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

export default new WeOmniOnlinePaymentController();