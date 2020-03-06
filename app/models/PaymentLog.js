let tableName = 'payment_log';
import mySqlDB from '../../database/sql';
let PaymentLog = {
    create: function (data) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`INSERT INTO ${tableName} SET ?`, data, function (error, result) {
                if (error) {
                    reject(error.message);
                } else {
                    let response = result;
                    resolve(response);
                }
            });
        }).catch(error => {
            return {"status_code": 500, "error": error}
        });
    },
}

module.exports = PaymentLog;