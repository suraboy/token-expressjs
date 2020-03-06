import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

let pool = mysql.createPool({
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    timezone: '+07:00'
});

pool.on('error', function(err) {
    console.log('db error', err);
});

export default {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
            connection.query(args[0], sql_args, function(err, results) {
                connection.release(); // always put connection back in pool after last query
                if(err){
                    console.log(err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    }
}