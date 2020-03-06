const createPaymentTransactionRequest = [
    {
        'field': 'payment_channel_id',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'order_id',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'order_no',
        'validate_type': ['required']
    }, {
        'field': 'outlet_id',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'outlet_name',
        'validate_type': ['required', 'custom'],
        'validate_params': {'custom': 'object'}
    }, {
        'field': 'terminal_id',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'terminal_no',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'member_type',
        'validate_type': ['required', 'enum'],
        'validate_params': {'enum': ['member', 'guest']}
    }, {
        'field': 'amount',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'currency',
        'validate_type': ['required', 'enum'],
        'validate_params': {'enum': ['THB']}
    }
];

export default createPaymentTransactionRequest