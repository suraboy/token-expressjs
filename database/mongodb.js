// let mongoose = require('mongoose');
// require('dotenv').config();
//
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
//
// mongoose.connect(process.env.MONGO_DB_URL + process.env.MONGO_DB_NAME, {
//     "user": process.env.MONGO_USERNAME,
//     "pass": process.env.MONGO_PASSWORD,
//     "useNewUrlParser": true
// });
//
// // mongoose.connect('mongodb://wok-mongo:27017/kafka', {
// //     "user": 'root-kafka',
// //     "pass": 'eggdigital',
// //     "useNewUrlParser": true
// // });
//
// mongoose.connection.on('connected', function () {
//     console.log("Mongoose connected ");
// });
//
// mongoose.connection.on('error', function (err) {
//     console.log("Mongoose default connection has occurred error : " + err);
// });
//
// mongoose.connection.on('disconnected', function () {
//     console.log("Mongoose connection is disconnected");
// });
//
// process.on('SIGINT', function () {
//     mongoose.connection.close(function () {
//         console.log("Mongoose default connection is disconnected due to application termination");
//         process.exit(0);
//     });
// });
//
// exports.connectMongoKafka = mongoose;