'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const PaymentChannels = sequelize.define('PaymentChannels', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        payment_provider_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'payment_provider_id',
            get() {
                return this.getDataValue('payment_provider_id')
            }
        },
        name: {
            type: DataTypes.JSON,
            field: 'name',
            get() {
                if (typeof this.getDataValue('name') === 'string') {
                    return JSON.parse(this.getDataValue('name'));
                }
                return this.getDataValue('name');
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
        tableName: 'payment_channels'
    });
    PaymentChannels.associate = function (models) {
        // associations can be defined here
    };

    sequelizePaginate.paginate(PaymentChannels)
    return PaymentChannels;
};
