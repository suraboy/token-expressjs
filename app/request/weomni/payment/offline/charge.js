const charge = [
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
        'field': 'amount',
        'validate_type': ['require','numeric','min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'currency',
        'validate_type': ['require', 'enum'],
        'validate_params': {'enum': ['THB']}
    },
    {
        'field': 'code',
        'validate_type': ['require','string','min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'description',
        'validate_type': ['string']
    },
    {
        'field': 'client_trx_id',
        'validate_type': ['string']
    },
    {
        'field': 'external',
        'validate_type': ['boolean']
    },
];

export default charge

