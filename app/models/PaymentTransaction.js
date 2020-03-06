let tableName = 'payment_transactions';
import mySqlDB from '../../database/sql';
let PaymentTransaction = {
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
    getByID: function (id) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, function (error, result) {
                if (error) {
                    console.log(error.message);
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
    getByTransactionID: function (transaction_id) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${tableName} WHERE transaction_id = '${transaction_id}' LIMIT 1`, function (error, result) {
                if (error) {
                    console.log(error.message);
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
    update: function (id, data) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`UPDATE ${tableName} SET ? WHERE id = ${id}`, data, function (error, result) {
                if (error) {
                    return reject(error.message);
                } else {
                    let response = result;
                    return resolve(response);
                }
            });
        }).catch(error => {
            return {"status_code": 500, "error": error}
        });
    },
}

module.exports = PaymentTransaction;