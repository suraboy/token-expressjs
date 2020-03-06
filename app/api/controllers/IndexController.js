import User from '../../models/User';
import httpStatus from 'http-status';
import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';
let logger = require('./../../../config/graylog').graylog;

class IndexController {
    async index(req, res, next) {

        // call axios
        // let productList = await curlAxios.get('https://am-rpp-alpha.eggdigital.com/horeca-api-product/v1/outlets/1/products');
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

            let users = await User.getAll();
            if (users.error) {
                let response = {
                    "messages": httpStatus[users.status_code],
                    "detail": users.error
                };
                return res.status(users.status_code).send(response);
            }

            let response = {
                "data": {
                    "user": users
                }
            };
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    async store(req, res, next) {
        try {
            let createUser = await User.create(req.body);
            if (createUser.error) {
                let response = {
                    "messages": httpStatus[createUser.status_code],
                    "detail": createUser.error
                };
                return res.status(createUser.status_code).send(response);
            }

            let user = await User.getByID(createUser.insertId);
            let response = {
                "data": {
                    "user": user
                }
            };
            return res.status(201).send(response);
        } catch (err) {
            return next(err);
        }
    };

    async show(req, res, next) {
        try {
            let user = await User.getByID(req.params.id);
            if (user.error) {
                let response = {
                    "messages": httpStatus[user.status_code],
                    "detail": user.error
                }
                return res.status(user.status_code).send(response);
            }

            let response = {
                "data": {
                    "user": user
                }
            };
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    async update(req, res, next) {
        try {
            let updateUser = await User.update(req.params.id, req.body);
            if (updateUser.error) {
                let response = {
                    "messages": httpStatus[updateUser.status_code],
                    "detail": updateUser.error
                };
                return res.status(updateUser.status_code).send(response);
            }

            let user = await User.getByID(id);
            let response = {
                "data": {
                    "user": user
                }
            };
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    async delete(req, res, next) {
        try {
            let deleteUser = await User.delete(req.params.id);
            if (deleteUser.error) {
                let response = {
                    "messages": httpStatus[deleteUser.status_code],
                    "detail": deleteUser.error
                };
                return res.status(deleteUser.status_code).send(response);
            }
            let response = {
                "data": {}
            };
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };
}

export default new IndexController();