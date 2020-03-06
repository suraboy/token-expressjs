require('dotenv').config();
import curlWeOmni from './../helpers/curlWeOmni';
import {getWeOmniToken} from './../middleware/weomni';
/*Setup default data*/
const env = `${process.env.WEOMNI_ENDPOINT}`;
const username = `${process.env.WEOMNI_KEY}`;
const password = `${process.env.WEOMNI_SECRET}`;

class weomiOffline{

    async get(endpoint, params) {
        const weOmniToken = await getWeOmniToken(`${env}`,username,password);

        if (weOmniToken.errors) {
            return weOmniToken.errors;
        }
        return await curlWeOmni.get(weOmniToken,`${env}${endpoint}`, params);
    }
    async post(endpoint, params) {
        const weOmniToken = await getWeOmniToken(`${env}`,username,password);

        if (weOmniToken.errors) {
            return weOmniToken.errors;
        }
        return await curlWeOmni.post(weOmniToken,`${env}${endpoint}`, params);
    };

}

export default new weomiOffline();