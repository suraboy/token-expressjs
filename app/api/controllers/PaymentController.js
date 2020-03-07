import {validationResult} from 'express-validator/check';
import {messageValidate} from '../../helpers/wrapValidateMessage';
import {paginate, getFullUrl, getOptions} from '../../helpers/pagination';
import dotenv from 'dotenv';
import models from '../../models/mysql';
import curlWeOmni from '../../helpers/curlWeOmni';
import {wrapErrorMessageWeOmni} from "./../../helpers/wrapErrorMessageWeOmni";
import {parseResponse} from "../../helpers/parseResponse";
import {getAccessToken} from "../../service/horecaToken";
import jwtDecode from 'jwt-decode';

dotenv.config();
let responseData = {};
var accessToken = '';

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

    async testAuthenAcc(req, res, next) {
        const endpoint = `${process.env.ACCOUNT_API_URL}v1/users`;
        var cookieToken = req.cookies.oauth;
        if (cookieToken === undefined) {
            accessToken = getToken(req, res);
        } else {
            accessToken = checkExpireTime(req, res, cookieToken);
        }
        let params = req.body;
        const response = await curlWeOmni.get(cookieToken, endpoint, params);
        if (response.status === 200) {
            responseData = response.data
        } else {
            responseData = wrapErrorMessageWeOmni(response.response)
        }
        return res.status(response.status).send(parseResponse(responseData));
    }
}

const getToken = async (req, res) => {
    try {
        const oauth = await getAccessToken();
        if (oauth.error) {
            return res.status(oauth.statusCode).json({
                errors: oauth
            })
        }
        var accessToken = oauth.data.access_token;
        res.cookie('oauth', accessToken, {maxAge: 900000, httpOnly: true});
        return accessToken;
    } catch (e) {
        console.log(e);
    }
}
const checkExpireTime = async (req, res, token) => {
    var jwt = jwtDecode(token);
    var current_time = Date.now() / 1000;
    if (jwt.exp < current_time) {
        return await getToken(req, res);
    } else {
        return token;
    }
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