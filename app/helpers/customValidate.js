import {buildCheckFunction} from 'express-validator/check';
import mySqlDB from '../../database/sql';

const body = buildCheckFunction(['body', 'query', 'params']);

export default function formRequest(request) {
    let validate = [];
    request.forEach(function (params) {
        params.validate_type.forEach(function (type) {
            switch (type) {
                case "require": {
                    validate.push(validateRequire(params.field));
                    break;
                }
                case "email": {
                    validate.push(validateEmail(params.field));
                    break;
                }
                case "numeric": {
                    validate.push(validateNumeric(params.field));
                    break;
                }
                case "min": {
                    const value = params.validate_params['min'];
                    validate.push(validateLength(params.field, value, 'min'));
                    break;
                }
                case "max": {
                    let value = params.validate_params['max'];
                    validate.push(validateLength(params.field, value, 'max'));
                    break;
                }
                case "size": {
                    let value = params.validate_params['size'];
                    validate.push(validateLength(params.field, value, 'size'));
                    break;
                }
                case "lat": {
                    validate.push(validateLatLong(params.field));
                    break;
                }
                case "boolean": {
                    validate.push(validateBoolean(params.field));
                    break;
                }
                case "enum": {
                    const value = params.validate_params['enum'];
                    validate.push(validateEnum(params.field, value));
                    break;
                }
                case "in": {
                    const value = params.validate_params['in'];
                    validate.push(validateArrayIn(params.field, params.validate_type, value));
                    break;
                }
                case "array": {
                    validate.push(validateArray(params.field));
                    break;
                }
                case "url": {
                    validate.push(validateUrl(params.field));
                    break;
                }
                case "exists": {
                    const table = params.validate_params['table_name'];
                    let column = 'id';
                    if (typeof params.validate_params['column_name'] !== 'undefined') {
                        column = params.validate_params['column_name'];
                    }
                    validate.push(validateExists(params.field, table, column));
                    break;
                }
                case "unique": {
                    const table = params.validate_params['table_name'];
                    const column = params.validate_params['column_name'];
                    validate.push(validateUnique(params.field, table, column));
                    break;
                }
                case "custom": {
                    let lang = [];
                    const type = params.validate_params['custom'];
                    validate.push(validateCustomEmpty(params.field, type, lang));
                    break;
                }
            }
        });
    });
    return validate;
};

const validateExists = (field, table, column) => {
    return body(`${field}`, `The ${field} does not exists.`).custom((value, {req}) => {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`, function (error, result) {
                if (error) {
                    return resolve(false);
                } else {
                    if (result.length == 0) {
                        return resolve(false);
                    }
                    return resolve(true);
                }
            });
        }).catch(error => {
            return resolve(response);
        });
    })
}

const validateUnique = (field, table, column) => {
    return body(`${field}`, `The ${field} has already been taken.`).custom((value, {req}) => {
        return new Promise(async function (resolve, reject) {
            await mySqlDB.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`, function (error, result) {
                if (error) {
                    return resolve(false);
                } else {
                    if (result.length == 0) {
                        return resolve(true);
                    }
                    return resolve(false);
                }
            });
        }).catch(error => {
            return resolve(response);
        });
    })
}

const validateUrl = (field) => {
    return body(`${field}`).isURL().withMessage(`The ${field} must use url format.`);
}

const validateArray = (field) => {
    return body(`${field}`).isArray().withMessage(`The ${field} must be an array.`);
}

const validateArrayIn = (field, type, array) => {
    return body(`${field}`, `The ${field} field does not exist in ${array}.`).custom((value, {req}) => {
        return new Promise(function (resolve, reject) {
            if (typeof type.require == 'undefined' && typeof value == 'undefined') {
                return resolve(true);
            } else if (typeof type.require == 'undefined' && typeof value !== 'undefined') {
                if (array.includes(value)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            } else {
                return resolve(false);
            }
        }).catch(error => {
            return resolve(response);
        });
    });
}

const validateCustomEmpty = (field, type, lang) => {
    return body(`${field}`, `The ${field} must be an ${type} and not empty.`).custom((value) => {
        switch (type) {
            case 'object': {
                if (typeof value === 'object' && Array.isArray(value) === false) {
                    let val = Object.values(value);
                    if (Object.values(value).length > 0) {
                        for (var i = 0; i < Object.values(value).length; i++) {
                            if (val[i].length > 0) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
                break;
            default:
                return false;
        }
        return true;
    })
}

const validateRequire = (field) => {
    return body(`${field}`, `${field} must have in body.`).exists()
        .not().isEmpty().withMessage(`The ${field} cannot be empty.`);
}


const validateEmail = (field) => {
    return body(`${field}`).isEmail().withMessage(`The ${field} must use email format.`);
}

const validateNumeric = (field) => {
    return body(`${field}`).isNumeric().withMessage(`The ${field} must be a number.`);
}

const validateLatLong = (field) => {
    return body(`${field}`).isLatLong().withMessage(`The ${field} does not match the format.`);
}

const validateBoolean = (field) => {
    return body(`${field}`).isBoolean().optional({nullable: true}).withMessage(`The ${field} field must be true or false.`);
}

const validateEnum = (field, array) => {
    return body(`${field}`).isIn(array).withMessage(`The ${field} field does not exist in ${array}.`);
}

const validateLength = (field, value, validator) => {
    let params = {};
    let msg = "";
    params[validator] = value;
    if (validator === 'min') {
        msg = `The ${field} must be at least ${value}`;
        value = {'min': value};
    }

    if (validator === 'max') {
        msg = `The ${field} may not be greater than ${value}`;
        value = {'max': value};
    }

    if (validator === 'size') {
        msg = `The ${field} must be ${value}`;
    }

    return body(`${field}`).isLength(value).withMessage(msg);
}