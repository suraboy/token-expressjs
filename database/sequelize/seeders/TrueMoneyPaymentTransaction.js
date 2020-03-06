var faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        let data = []
        let initial = 1;
        const max = 6;

        while (initial++ < max)

            data.push({
                id: initial,
                order_id: initial,
                oauth_client_id: 2,
                customer_id: 1,
                customer_name: faker.name.firstName(),
                customer_mobile: faker.phone.phoneNumber(),
                isv_payment_ref: faker.random.uuid(),
                payment_id: faker.random.uuid(),
                payment_code: faker.random.uuid(),
                request_amount: faker.finance.amount(),
                status: 'success',
                timestamp: Math.floor(new Date() / 1000),
                description: '',
                metadata: '{}',
                log_response: '{}',
                reconcile_status: 0,
                payment_by: 'tcg_bs',
                payment_type: 'offline',
                created_at: new Date(),
                updated_at: new Date()
            });

        return await queryInterface.bulkInsert('truemoney_payment_transactions', data);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('truemoney_payment_transactions', null, {});
    },
};