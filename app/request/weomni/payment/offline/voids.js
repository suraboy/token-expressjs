const voids = [
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
        'field': 'external',
        'validate_type': ['boolean']
    }
];

export default voids