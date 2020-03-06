import graylog2 from 'graylog2';
import dotenv from 'dotenv';
dotenv.config();

exports.graylog = new graylog2.graylog({
    servers: [
        {'host': process.env.GRAYLOG_HOST, port: process.env.GRAYLOG_PORT}
    ],
    facility: `${process.env.NODE_ENV}-${process.env.GRAYLOG_FACILITY}`
});