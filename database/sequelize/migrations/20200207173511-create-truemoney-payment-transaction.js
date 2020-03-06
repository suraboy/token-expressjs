'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('truemoney_payment_transactions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: {
                type: Sequelize.INTEGER
            },
            oauth_client_id: {
                type: Sequelize.INTEGER
            },
            customer_id: {
                type: Sequelize.INTEGER
            },
            customer_name: {
                type: Sequelize.STRING
            },
            customer_mobile: {
                type: Sequelize.STRING
            },
            isv_payment_ref: {
                type: Sequelize.STRING
            },
            payment_id: {
                type: Sequelize.STRING
            },
            payment_code: {
                type: Sequelize.STRING
            },
            request_amount: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM('pending', 'success', 'fail', 'cancel'),
            },
            timestamp: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            metadata: {
                type: Sequelize.STRING
            },
            log_response: {
                type: Sequelize.STRING
            },
            reconcile_status: {
                type: Sequelize.BOOLEAN
            },
            payment_by: {
                type: Sequelize.ENUM('app','pos','tcg_bs','horeca_bs')
            },
            payment_type: {
                type: Sequelize.ENUM('online', 'offline')
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('truemoney_payment_transactions');
    }
};