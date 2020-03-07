
class getToken {
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
                    return response;
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
