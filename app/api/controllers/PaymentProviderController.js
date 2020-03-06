import {validationResult} from 'express-validator/check';
import {messageValidate} from '../../helpers/wrapValidateMessage';
import {paginate, getFullUrl, getOptions} from '../../helpers/pagination';
import dotenv from 'dotenv';
import models from '../../models/mysql';

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

class PaymentProviderController {

    /* Get All `Payment Provider` */
    async index(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const options = getOptions(req)
            const {docs, pages, total} = await models.PaymentProviders.paginate(options).then(data => {
                for (var i = 0; i < data.docs.length; i++) {
                    data.docs[i].name = JSON.parse(data.docs[i].name);
                }
                return data;
            });

            const count = Object.keys(docs).length;

            let pagination = paginate(getFullUrl(req), count, pages, total, options.paginate, options.page)

            let response = {
                data: docs,
                meta: pagination
            }

            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    /* Show `Payment Provider` by ID */
    async show(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }
            const docs = await models.PaymentProviders.findByPk(req.params.id).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return data;
                }
            );

            let response = {
                data: docs
            }

            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    /* Create `Payment Provider` */
    async create(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const docs = await models.PaymentProviders.create(req.body);
            let response = {
                data: docs
            }
            return res.status(201).send(response);
        } catch (err) {
            return next(err);
        }
    };

    /* Update `Payment Provider` */
    async update(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            delete req.body.id;
            
            const docs = await models.PaymentProviders.findByPk(req.params.id).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return models.PaymentProviders.update(req.body, {where: {id: req.params.id}}).then(
                        _data => {
                            if (_data) {
                                return models.PaymentProviders.findByPk(req.params.id);
                            }
                            return res.status(417).json({
                                "errors": {
                                    "status_code": 417,
                                    "message": "Update fail."
                                }
                            });
                        }
                    )
                }
            );

            let response = {
                data: docs
            }
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    /* Delete `Payment Provider` by ID */
    async delete(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const docs = await models.PaymentProviders.findByPk(req.params.id).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return models.PaymentProviders.destroy({where: {id: req.params.id}}).then(
                        _data => {
                            if (_data) {
                                return res.status(203).send();
                            }

                            return res.status(417).json({
                                "errors": {
                                    "status_code": 417,
                                    "message": "Delete fail."
                                }
                            });
                        }
                    );
                }
            );

        } catch (err) {
            return next(err);
        }
    };
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

export default new PaymentProviderController();