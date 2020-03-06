let tableName = 'payment_configs';
import mySqlDB from '../../database/sql';
let PaymentConfig = {
    getConfig: function (outlet_id, terminal_id, payment_channel_id) {
        // console.log(`SELECT * FROM ${tableName} WHERE outlet_id = ${outlet_id} AND terminal_id = ${terminal_id} AND payment_channel_id = ${payment_channel_id}`) 
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${tableName} WHERE outlet_id = ${outlet_id} AND terminal_id = ${terminal_id} AND payment_channel_id = ${payment_channel_id}`, function (error, result) {
                if (error) {
                    return reject(error.message);
                } else {
                    let response = result[0];
                    if (result.length == 0) {
                        response = {
                            "status_code": 404,
                            "error": `${tableName.toUpperCase()} Not Found`
                        }
                    }
                    return resolve(response);
                }
            });
        }).catch(error => {
            return {"status_code": 500, "error": error}
        });
    },
}

module.exports = PaymentConfig;