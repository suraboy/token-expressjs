const createPaymentChannelRequest = [
    {
        'field': 'payment_provider_id',
        'validate_type': ['required', 'numeric', 'exists'],
        'validate_params': {'table_name': 'payment_providers'}
    },
    {
        'field': 'name',
        'validate_type': ['required', 'custom'],
        'validate_params': {'custom': 'object'}
    }
];

export default createPaymentChannelRequest