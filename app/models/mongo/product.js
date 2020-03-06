let mongoDB = require('../../../database/mongodb');
let datetime = require('node-datetime');
let mongoKafka = mongoDB.connectMongoKafka;

let Schema = mongoKafka.Schema;
let productSchema = new Schema({
        // product_code: String,
        // is_combo: String,
        // name_th: String,
        // name_en: String,
        // partition: String,
        // offset: Number,
        created_at: {type: Date, default: Date.now}
    },
    {
        strict: false
    }
);
let dt = datetime.create();
let dateNow = dt.format('Y_m_d');
let modelName = 'product_' + dateNow;
module.exports = mongoKafka.model(modelName, productSchema);
