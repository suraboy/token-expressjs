const activate = [
    {
        'field': 'activation_code',
        'validate_type': ['require']
    },
    {
        'field': 'imei',
        'validate_type': ['require']
    },
    {
        'field': 'latitude',
        'validate_type': ['require']
    },
    {
        'field': 'longitude',
        'validate_type': ['require']
    },
    {
        'field': 'password',
        'validate_type': ['require']
    },
    {
        'field': 'external',
        'validate_type': ['boolean']
    }
];

export default activate