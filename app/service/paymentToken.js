'use strict'
import dotenv from 'dotenv'
import axios from 'axios'
import atob from 'atob'
import db from '../../database/sql'

dotenv.config();

class paymentToken {
    constructor() {
        this.url = process.env.ACCOUNT_API_URL
        this.axios = axios
    }
    async getToken() {
        var last_token = await this.getLastToken()
        if (Date.now() >= last_token[0].expires_in * 1000) {
            //expired
            let token = await this.newToken()
            await this.updateDB(token.access_token)
            return token.access_token
        } else {
            return last_token[0].token
        }
    };
    async newToken() {
        let url = this.url + 'api/v1/oauth/token'
        let params = {
            grant_type: 'password',
            client_id: process.env.PAYMENT_TOKEN_CLIENT_ID,
            client_secret: process.env.PAYMENT_TOKEN_CLIENT_SECRET,
            username: process.env.PAYMENT_TOKEN_USERNAME,
            password: process.env.PAYMENT_TOKEN_PASSWORD
        }
        let result;
        await this.axios.post(url, params)
        .then(function (response) {
            result = response.data
        })
        .catch(function (error) {
            result = {status: error.response.status, message: 'Token Fail'}
        })
        return result
    }
    async getLastToken() {
        return new Promise(function(resolve, reject) {
            db.query("SELECT * FROM payment_token WHERE id = 1 LIMIT 1", function (err, result, fields) {
                if (err) throw reject(err);
                return resolve(result)
            });
        });
    }
    async updateDB(token) {
        let expires_in =  await this.getExpiredFromJwt(token)
        return new Promise(function(resolve, reject) {
            db.query("UPDATE `payment_token` SET `token` = ?, `expires_in` = ? WHERE `id` = 1 LIMIT 1", [token, expires_in], function (err, result, fields) {
                if (err) throw reject(err);
                return resolve(result)
            });
        });
    }
    async getExpiredFromJwt (token) {
        let result = '';
        if(token) {
            var base64Url = token.split('.')[1];
            if(typeof base64Url != 'undefined') {
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                result = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }
        }
        return JSON.parse(result).exp
    }
}

module.exports = paymentToken
