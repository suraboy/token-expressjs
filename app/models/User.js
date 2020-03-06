let tableName = 'users';
import mySqlDB from '../../database/sql';
let User = {
    getAll: function () {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${tableName}`, function (error, result) {
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
    delete: function (id) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`DELETE FROM ${tableName} WHERE id=${id}`, function (error, result) {
                if (error) {
                    return reject(error.message);
                } else {
                    return resolve(result);
                }
            });
        }).catch(error => {
            return {"status_code": 500, "error": error}
        });
    },
    customQuery: function (query) {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(query, function (error, result) {
                if (error) {
                    return reject(error.message);
                } else {
                    return resolve(result);
                }
            });
        }).catch(error => {
            return {"status_code": 500, "error": error}
        });
    }
};

module.exports = User;