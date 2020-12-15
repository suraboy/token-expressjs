import dotenv from 'dotenv';
import axios from '../../helpers/curlAxios';
import {wrapErrorMessageWeOmni} from "./../../helpers/wrapErrorMessageWeOmni";
import {parseResponse} from "../../helpers/parseResponse";
import {getAccessToken} from "../../service/horecaToken";
import jwtDecode from 'jwt-decode';

dotenv.config();
var accessToken = '';

class TokenController {
    async testAuthenAcc(req, res, next) {
        let responseData;
        const endpoint = `${process.env.ACCOUNT_API_URL}v1/users`;
        var cookieToken = req.cookies.oauth;
        if (cookieToken === undefined) {
            accessToken = await getToken(req, res);
        } else {
            accessToken = await checkExpireTime(req, res, cookieToken);
        }
        let params = req.body;
        const response = await axios.get(accessToken, endpoint, params);

        return res.status(response.status).send(parseResponse(response));
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

export default new TokenController();