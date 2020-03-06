'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const PaymentProviders = sequelize.define('PaymentProviders', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        name: {
            type: DataTypes.JSON,
            field: 'name',
            get() {
                if(typeof this.getDataValue('name') === 'string'){
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
        tableName: 'payment_providers'
    });
    PaymentProviders.associate = function (models) {
        // associations can be defined here
    };

    sequelizePaginate.paginate(PaymentProviders)
    return PaymentProviders;
};
