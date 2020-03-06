'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const PaymentTransactions = sequelize.define('PaymentTransactions', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        transaction_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'transaction_id',
            get() {
                return this.getDataValue('transaction_id')
            }
        },
        payment_channel_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'payment_channel_id',
            get() {
                return this.getDataValue('payment_channel_id')
            }
        },
        order_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'order_id',
            get() {
                return this.getDataValue('order_id')
            }
        },
        outlet_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'outlet_id',
            get() {
                return this.getDataValue('outlet_id')
            }
        },
        outlet_name: {
            type: DataTypes.JSON,
            field: 'outlet_name',
            get() {
                if (typeof this.getDataValue('outlet_name') === 'string') {
                    return JSON.parse(this.getDataValue('outlet_name'));
                }
                return this.getDataValue('outlet_name');
            }
        },
        terminal_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'terminal_id',
            get() {
                return this.getDataValue('terminal_id')
            }
        },
        terminal_no: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'terminal_no',
            get() {
                return this.getDataValue('terminal_no')
            }
        },
        member_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'member_id',
            allowNull: true,
            get() {
                return this.getDataValue('member_id')
            }
        },
        member_type: {
            type: DataTypes.STRING,
            field: 'member_type',
            get() {
                return this.getDataValue('member_type')
            }
        },
        amount: {
            type: DataTypes.BIGINT(11),
            field: 'amount',
            get() {
                return this.getDataValue('amount')
            }
        },
        currency: {
            type: DataTypes.STRING,
            field: 'currency',
            get() {
                return this.getDataValue('currency')
            }
        },
        status: DataTypes.ENUM('waiting', 'success', 'fail', 'cancel', 'reject'),
        sync_status: DataTypes.ENUM('Y', 'N'),
        payment_reference: {
            type: DataTypes.STRING,
            field: 'payment_reference',
            get() {
                return this.getDataValue('payment_reference')
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
        tableName: 'payment_transactions'
    });
    PaymentTransactions.associate = function (models) {
        // associations can be defined here
        // PaymentTransactions.belongsTo(models.PaymentConfigs, {
        //     foreignKey: 'payment_channel_id',
        //     targetKey: 'payment_channel_id',
        //     as: 'request_body'
        // })

    };

    sequelizePaginate.paginate(PaymentTransactions)
    return PaymentTransactions;
};
