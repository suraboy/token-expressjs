const cancelPayment = [
    {
        'field': 'merchant_id',
        'validate_type': ['require']
    },
    {
        'field': 'outlet_id',
        'validate_type': ['require']
    },
    {
        'field': 'terminal_id',
        'validate_type': ['require']
    },
    {
        'field': 'tx_ref_id',
        'validate_type': ['require']
    }
];

export default cancelPayment