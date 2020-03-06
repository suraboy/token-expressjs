import axios from 'axios';

import graylog from "../../config/graylog";

const logger = graylog.graylog
let additionalFields = {
    levelName: 'error',
    version: '1.0',
    logType: 'out_response',
    request: {},
    response: {}
}

class curlWeOmni {
    async get(weOmniToken, endpoint, params) {
        try {
            additionalFields['endpoint'] = endpoint
            return await axios.get(`${endpoint}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${weOmniToken}`
                },
                params: params
            })
                .then(function (response) {
                    console.log(response);

                    return response;
                })
                .catch(function (error) {

                    return error;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async post(weOmniToken, endpoint, data) {
        try {
            additionalFields['endpoint'] = endpoint
            return await axios.post(`${endpoint}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${weOmniToken.token}`
                }
            })
                .then(function (response) {
                    let res = {
                        'status': response.status,
                        'response': {
                            'data': response.data
                        }
                    };
                    return res;
                })
                .catch(function (error) {
                    let res = {
                        'status': error.response.status,
                        'response': error.response
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async put(weOmniToken, endpoint, data) {
        try {
            additionalFields['endpoint'] = endpoint
            return await axios.put(`${endpoint}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${weOmniToken.token}`
                }
            })
                .then(function (response) {
                    let res = {
                        'status': response.status,
                        'response': {
                            'data': response.data
                        }
                    };
                    return res;
                })
                .catch(function (error) {
                    let res = {
                        'status': error.response.status,
                        'response': error.response
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async delete(weOmniToken, endpoint) {
        try {
            additionalFields['endpoint'] = endpoint
            return await axios.delete(`${endpoint}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${weOmniToken.token}`
                }
            })
                .then(function (response) {
                    let res = {
                        'status': response.status,
                        'response': {
                            'data': response.data
                        }
                    };
                    return res;
                })
                .catch(function (error) {
                    let res = {
                        'status': error.response.status,
                        'response': error.response
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };
}
export default new curlWeOmni();
