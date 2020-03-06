const checkPayment = [
    {
        'field': 'brand_id',
        'validate_type': ['require','string','min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'branch_id',
        'validate_type': ['require','string','min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'terminal_id',
        'validate_type': ['require','string','min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'client_trx_id',
        'validate_type': ['require','string','min'],
        'validate_params': {'min': 1}
    }
];

export default checkPayment