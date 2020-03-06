import axios from 'axios';

class curlAxios {

    async get(endpoint, config) {
        try {
            return await axios.get(`${endpoint}`, config)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data);
                    let res = {
                        'status': response.status,
                        'response': response.data
                    };
                    return res;
                })
                .catch(function (error) {
                    console.log(error);
                    // console.log('error', error.response.data);
                    let res = {
                        'status': error.response.status,
                        'response': error.response.data
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async post(endpoint, data, config) {
        try {
            return await axios.post(`${endpoint}`, data, config)
                .then(function (response) {
                    console.log(response.data);
                    let res = {
                        'status': response.status,
                        'response': response.data
                    };
                    return res;
                })
                .catch(function (error) {
                    console.log('error', error.response.data);
                    let res = {
                        'status': error.response.status,
                        'response': error.response.data
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async put(endpoint, data, config) {
        console.log(data , config)
        try {
            return await axios.put(`${endpoint}`, data, config)
                .then(function (response) {
                    console.log(response.data);
                    let res = {
                        'status': response.status,
                        'response': response.data
                    };
                    return res;
                })
                .catch(function (error) {
                    console.log('error', error.response.data);
                    let res = {
                        'status': error.response.status,
                        'response': error.response.data
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };

    async delete(endpoint, config) {
        try {
            return await axios.delete(`${endpoint}`, config)
                .then(function (response) {
                    console.log(response.data);
                    let res = {
                        'status': response.status,
                        'response': response.data
                    };
                    return res;
                })
                .catch(function (error) {
                    console.log('error', error.response.data);
                    let res = {
                        'status': error.response.status,
                        'response': error.response.data
                    };
                    return res;
                });
        } catch (error) {
            console.error(error);
        }
    };
}

export default new curlAxios();
