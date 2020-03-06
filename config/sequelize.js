import dotenv from 'dotenv';
dotenv.config();

export let sequelizeConfig = {
    local: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    },
    alpha: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    },
    staging: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    },
    test: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: "sequelize_jest_test",
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    },
    preprod: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    },
    production: {
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql"
    }
}