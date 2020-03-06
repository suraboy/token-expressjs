import graylog from "../../config/graylog";

require('dotenv').config();
import curlWeOmni from './../helpers/curlWeOmni';
import {getWeOmniToken} from './../middleware/weomni';
import dotenv from "dotenv";

const logger = graylog.graylog
dotenv.config();

let additionalFields = {
    levelName: 'info',
    endpoint: `${process.env.RPP_PAYMENT_SERVICE}uaa/oauth/token`,
    version: '1.0',
    logType: 'out_response',
    response: {}
}

/*Setup default data*/
const env = `${process.env.RPP_PAYMENT_SERVICE}`;
const env_token = `${process.env.RPP_PAYMENT_SERVICE}uaa/`;
const username = `${process.env.AUTH_RPP_PAYMENT_USER}`;
const password = `${process.env.AUTH_RPP_PAYMENT_PASSWORD}`;

class weomiOnline{

    async get(endpoint, params) {
        const weOmniToken = await getWeOmniToken(`${env_token}`,username,password);
        if (weOmniToken.errors) {
            additionalFields['levelName'] = 'error'
            additionalFields['response'] = weOmniToken.errors
            logger.error('WeOmniAuthentication: Response(Error)', 'WeOmniAuthentication: Response(Error)', additionalFields);
            return weOmniToken.errors;
        }
        return await curlWeOmni.get(weOmniToken,`${env}${endpoint}`, params);
    }
    async post(endpoint, params) {
        const weOmniToken = await getWeOmniToken(`${env_token}`,username,password);
        if (weOmniToken.errors) {
            additionalFields['levelName'] = 'error'
            additionalFields['response'] = weOmniToken.errors
            logger.error('WeOmniAuthentication: Response(Error)', 'WeOmniAuthentication: Response(Error)', additionalFields);
            return weOmniToken.errors;
        }

        return await curlWeOmni.post(weOmniToken,`${env}${endpoint}`, params);
    };

}

export default new weomiOnline();