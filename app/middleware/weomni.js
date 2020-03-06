import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

exports.getWeOmniToken = async (env,username,password) => {
    try {
        return await axios.post(env + 'oauth/token',
            qs.stringify({"grant_type": "client_credentials"})
            , {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                auth: {
                    "username": username,
                    "password": password
                }
            })
            .then(function (response) {
                return {'token': response.data.access_token};
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