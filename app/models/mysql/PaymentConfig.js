'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const PaymentConfigs = sequelize.define('PaymentConfigs', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        outlet_id: {
            type: DataTypes.INTEGER.UNSIGNED, get() {
                return this.getDataValue('outlet_id');
            }
        },
        terminal_id: {
            type: DataTypes.INTEGER.UNSIGNED, get() {
                return this.getDataValue('terminal_id');
            }
        },
        payment_channel_id: {
            type: DataTypes.INTEGER.UNSIGNED, get() {
                return this.getDataValue('payment_channel_id');
            }
        },
        payment_provider_id: {
            type: DataTypes.INTEGER.UNSIGNED, get() {
                return this.getDataValue('payment_provider_id');
            }
        },
        merchant_id: {
            type: DataTypes.INTEGER.UNSIGNED, get() {
                return this.getDataValue('merchant_id');
            }
        },
        data_config: {
            type: DataTypes.JSON,
            field: 'data_config',
            get() {
                if (typeof this.getDataValue('data_config') === 'string') {
                    return JSON.parse(this.getDataValue('data_config'));
                }
                return this.getDataValue('data_config');
            }

        },
        return_uri: {
            type: DataTypes.STRING, get() {
                return this.getDataValue('return_uri');
            }
        },
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'payment_configs'
    });
    PaymentConfigs.associate = function (models) {
        // associations can be defined here
    };

    sequelizePaginate.paginate(PaymentConfigs)
    return PaymentConfigs;
};
