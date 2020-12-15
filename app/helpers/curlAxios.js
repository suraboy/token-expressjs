import axios from 'axios';

class curlAxios {

    async get(token, endpoint, params, options) {
        try {
            const optionsAxios = {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                params: params,
                timeout: (options && options.limit >= 1) ? options.limit * 1000 : undefined,
            }
            return await axios.get(`${endpoint}`, optionsAxios)
                .then(function (response) {
                    return {
                        'status': response.status,
                        'response': response.data.data
                    };
                })
                .catch(function (error) {
                    let res;
                    if (error.response) {
                        res = {
                            'status': error.response.status,
                            'response': error.response
                        };
                    } else {
                        res = {
                            'status': 500,
                            'response': (error.message.search('exceeded')) ? 'Execution time out.' : error.message
                        };
                    }
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async post(weOmniToken, endpoint, data) {
        try {
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
export default new curlAxios();
