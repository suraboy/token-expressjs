const createPaymentConfigRequest = [
    {
        'field': 'outlet_id',
        'validate_type': ['required', 'numeric']
    }, {
        'field': 'terminal_id',
        'validate_type': ['required', 'numeric']
    },
    {
        'field': 'payment_channel_id',
        'validate_type': ['required', 'numeric', 'exists'],
        'validate_params': {'table_name': 'payment_channels'}
    },
    {
        'field': 'payment_provider_id',
        'validate_type': ['required', 'numeric', 'exists'],
        'validate_params': {'table_name': 'payment_providers'}
    },
    {
        'field': 'merchant_id',
        'validate_type': ['required', 'numeric']
    },
    {
        'field': 'data_config',
        'validate_type': ['required', 'custom'],
        'validate_params': {'custom': 'object'}
    },
    {
        'field': 'return_uri',
        'validate_type': ['required', 'url']
    }
];

export default createPaymentConfigRequest