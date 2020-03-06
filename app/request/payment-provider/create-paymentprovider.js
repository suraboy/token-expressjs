const createPaymentProviderRequest = [
    {
        'field': 'name',
        'validate_type': ['required', 'custom'],
        'validate_params': {'custom': 'object'}
    }
];

export default createPaymentProviderRequest