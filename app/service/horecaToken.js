import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const env = `${process.env.ACCOUNT_API_URL}`;
const client_id = `${process.env.HORECA_CLIENT_ID}`;
const client_secrect = `${process.env.HORECA_CLIENT_SECRET}`;
const username = `${process.env.HORECA_USERNAME}`;
const password = `${process.env.HORECA_PASSWORD}`;

exports.getAccessToken = async () => {
    try {
        return await axios.post(env + 'v1/oauth/token',
            qs.stringify({
                "grant_type":"password",
                "client_id":client_id,
                "client_secret":client_secrect,
                "username": username,
                "password": password
            })
            , {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                if (error.response == undefined) {
                    let res = {
                        'errors': {
                            'status': 500,
                            'response': {
                                "errors": {
                                    "status_code": 500,
                                    "message": error.errno
                                }
                            }
                        }
                    };
                    return res;
                } else {
                    let res = error.response;
                    return res;
                }

            });
    } catch (error) {
        console.error(error);
    }
}