'use strict'
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.SERVICE_PORT || 3000;


app.listen(port, function () {
    console.log('Server running on port %d', port);
});