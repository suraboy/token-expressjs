'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { sequelizeConfig }  from '../../../config/sequelize.js'
import moment from 'moment'

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';

let config = sequelizeConfig[env];

let db = {};

config['pool'] = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}

config['dialectOptions'] = {
    typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATE' || field.type === 'TIMESTAMP') {
            return moment(field.string()).toISOString(true);
        }
        return next();
    }
}

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;