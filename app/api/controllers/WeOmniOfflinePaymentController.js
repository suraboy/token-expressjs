import {validationResult} from 'express-validator/check';
import {parseResponse} from '../../helpers/parseResponse';
import {messageValidate} from './../../helpers/wrapValidateMessage';
import weomiOffline from './../../service/weomiOffline';
import dotenv from 'dotenv';
import graylog from '../../../config/graylog'
import {wrapErrorMessageWeOmni} from "./../../helpers/wrapErrorMessageWeOmni";
const logger = graylog.graylog
dotenv.config();

let additionalFields = {
    levelName: 'info',
    endpoint: '',
    version: '1.0',
    logType: 'out_response',
    response: {},
}

let responseData = {}

class WeOmniOfflinePaymentController {

    async activateCode(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }
            /*End Error*/
            let params = req.body;
            const header = req.headers['authorization'];

            //Set Parameter for activate
            params['activationCode'] = params['activation_code'];
            params['external'] = params.external || false;

            const endpoint = `${process.env.WEOMNI_ENDPOINT}v1/terminals/activate`

            logger.info('WeOmniOfflinePaymentActivateCode: Request', 'WeOmniOfflinePaymentActivateCode: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            const response = await weomiOffline.post(`v1/terminals/activate`, params);

            additionalFields['endpoint'] = endpoint

            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOfflinePaymentActivateCode: Response(Success)', 'WeOmniOfflinePaymentActivateCode: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOfflinePaymentActivateCode: Response(Error)', 'WeOmniOfflinePaymentActivateCode: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));

        } catch (err) {
            return next(err);
        }
    };

    async charge(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = {
                    "errors": {
                        "status_code": 422,
                        "message": "The gives data was invalid.",
                        "errors": messageError
                    }
                };
                return res.status(422).json(response);
            }

            const body = req.body;
            const terminalId = body.terminal_id;
            const params = {
                brandId: body.brand_id,
                branchId: body.branch_id,
                payment: {
                    amount: parseFloat(body.amount),
                    currency: body.currency,
                    code: body.code,
                    method: 'WALLET',
                    description: body.description || '',
                    clientTrxId: body.client_trx_id
                },
                external: body.external || false
            };

            const endpoint = `${process.env.WEOMNI_ENDPOINT}payment/v1/terminals/${terminalId}/payments`

            logger.info('WeOmniOfflinePaymentCharge: Request', 'WeOmniOfflinePaymentCharge: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            const response = await weomiOffline.post(`payment/v1/terminals/${terminalId}/payments`, params);

            additionalFields['endpoint'] = endpoint

            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOfflinePaymentCharge: Response(Success)', 'WeOmniOfflinePaymentCharge: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOfflinePaymentCharge: Response(Error)', 'WeOmniOfflinePaymentCharge: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));

        } catch (err) {
            return next(err);
        }
    }

    async void(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const messageError = await messageValidate(errors.array());
                const response = {
                    "errors": {
                        "status_code": 422,
                        "message": "The gives data was invalid.",
                        "errors": messageError
                    }
                };
                return res.status(422).json(response);
            }

            const body = req.body;
            const terminalId = body.terminal_id;
            const params = {
                "brandId": body.brand_id,
                "branchId": body.branch_id,
                "external": body.external || false
            };

            const traceId = req.params.id

            const endpoint = `${process.env.WEOMNI_ENDPOINT}payment/v1/terminals/${terminalId}/payments/${traceId}/void`

            logger.info('WeOmniOfflinePaymentVoid: Request', 'WeOmniOfflinePaymentVoid: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: params
            });

            const response = await weomiOffline.post(`payment/v1/terminals/${terminalId}/payments/${traceId}/void`, params);

            additionalFields['endpoint'] = endpoint

            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOfflinePaymentVoid: Response(Success)', 'WeOmniOfflinePaymentVoid: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOfflinePaymentVoid: Response(Error)', 'WeOmniOfflinePaymentVoid: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));

        } catch (err) {
            return next(err);
        }
    };

    async getPaymentStatus(req, res, next) {
        try {
            const txRefId = req.params.client_trx_id;

            const endpoint = `${process.env.WEOMNI_ENDPOINT}payment/v1/payment/${txRefId}/status`

            logger.info('WeOmniOfflinePaymentGetPaymentStatus: Request', 'WeOmniOfflinePaymentGetPaymentStatus: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: {}
            });

            const response = await weomiOffline.get(`payment/v1/payment/${txRefId}/status`);

            additionalFields['endpoint'] = endpoint
            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOfflinePaymentGetPaymentStatus: Response(Success)', 'WeOmniOfflinePaymentGetPaymentStatus: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOfflinePaymentGetPaymentStatus: Response(Error)', 'WeOmniOfflinePaymentGetPaymentStatus: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));

        } catch (err) {
            return next(err);
        }
    };

    async getPaymentStatusByclientTxt(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = {
                    "errors": {
                        "status_code": 422,
                        "message": "The gives data was invalid.",
                        "errors": messageError
                    }
                };
                return res.status(422).json(response);
            }

            const clientTrxId = req.params.client_trx_id;
            const terminalId = req.query.terminal_id;

            const endpoint = `${process.env.WEOMNI_ENDPOINT}payment/v1/payment/terminals/${terminalId}/client-trxs/${clientTrxId}/status`

            logger.info('WeOmniOfflinePaymentGetPaymentStatusByClientTrxId: Request', 'WeOmniOfflinePaymentGetPaymentStatusByClientTrxId: Request', {
                levelName: 'info',
                endpoint: endpoint,
                version: '1.0',
                logType: 'out_request',
                request: {}
            });

            let params = {
                'brandId' :req.query.brand_id,
                'branchId':req.query.branch_id,
            };

            const response = await weomiOffline.get(`payment/v1/payment/terminals/${terminalId}/client-trxs/${clientTrxId}/status`,params);

            additionalFields['endpoint'] = endpoint
            if (response.status === 200) {
                responseData = response.response
                additionalFields['response'] = responseData
                logger.info('WeOmniOfflinePaymentGetPaymentStatusByClientTrxId: Response(Success)', 'WeOmniOfflinePaymentGetPaymentStatusByClientTrxId: Response(Success)', additionalFields);
            } else {
                responseData = wrapErrorMessageWeOmni(response.response)
                additionalFields['response'] = response.response.data
                additionalFields['levelName'] = 'error'
                logger.error('WeOmniOfflinePaymentGetPaymentStatusByClientTrxId: Response(Error)', 'WeOmniOfflinePaymentGetPaymentStatusByClientTrxIds: Response(Error)', additionalFields);
            }

            return res.status(response.status).send(parseResponse(responseData));

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

export default new WeOmniOfflinePaymentController();