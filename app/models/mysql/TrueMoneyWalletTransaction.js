'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const TrueMoneyPaymentTransaction = sequelize.define('TrueMoneyPaymentTransaction', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        order_id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            field: 'order_id',
            get() {
                return this.getDataValue('order_id');
            }
        },
        client_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'oauth_client_id',
            get() {
                return this.getDataValue('client_id');
            }
        },
        customer_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'customer_id',
            get() {
                return this.getDataValue('customer_id');
            }
        },
        customer_name: {
            type: DataTypes.STRING,
            field: 'customer_name',
            get() {
                return this.getDataValue('customer_name');
            }
        },
        customer_mobile: {
            type: DataTypes.STRING,
            field: 'customer_mobile',
            get() {
                return this.getDataValue('customer_mobile');
            }
        },
        tx_ref_id: {
            type: DataTypes.STRING,
            field: 'isv_payment_ref',
            get() {
                return this.getDataValue('tx_ref_id');
            }
        },
        payment_id: {
            type: DataTypes.STRING,
            field: 'payment_id',
            get() {
                return this.getDataValue('payment_id');
            }
        },
        payment_code: {
            type: DataTypes.STRING,
            field: 'payment_code',
            get() {
                return this.getDataValue('payment_code');
            }
        },
        amount: {
            type: DataTypes.BIGINT(11),
            field: 'request_amount',
            get() {
                return this.getDataValue('amount');
            }
        },
        status: {
            type: DataTypes.ENUM('pending', 'success', 'fail', 'cancel'),
            field: 'status',
            get() {
                return this.getDataValue('status');
            }
        },
        timestamp: {
            type: DataTypes.INTEGER,
            field: 'timestamp',
            get() {
                return this.getDataValue('timestamp');
            }
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
            get() {
                return this.getDataValue('description');
            }
        },
        metadata: {
            type: DataTypes.STRING,
            field: 'metadata',
            get() {
                return this.getDataValue('metadata');
            }
        },
        log_response: {
            type: DataTypes.STRING,
            field: 'log_response',
            get() {
                return this.getDataValue('log_response');
            }
        },
        reconcile_status: {
            type: DataTypes.BOOLEAN,
            field: 'reconcile_status',
            get() {
                return this.getDataValue('reconcile_status');
            }
        },
        payment_type: {
            type: DataTypes.ENUM('online', 'offline'),
            field: 'payment_type',
            get() {
                return this.getDataValue('payment_type');
            }
        },
        payment_by: {
            type: DataTypes.ENUM('app','pos','tcg_bs','horeca_bs'),
            field: 'payment_by',
            get() {
                return this.getDataValue('payment_by');
            }
        },
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).toISOString(true);
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                const dateText = this.getDataValue('updated_at');
                return moment(dateText).toISOString(true);
            }
        }
    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'truemoney_payment_transactions'
    });
    TrueMoneyPaymentTransaction.associate = function (models) {
        // associations can be defined here
    };

    sequelizePaginate.paginate(TrueMoneyPaymentTransaction)
    return TrueMoneyPaymentTransaction;
};