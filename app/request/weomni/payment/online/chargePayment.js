const chargePayment = [
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
        'field': 'amount',
        'validate_type': ['require', 'numeric']
    },
    {
        'field': 'channel',
        'validate_type': ['require', 'enum'],
        'validate_params': {'enum': ['EDC','APP','WEB','POS','ONLINE']}

    },
    {
        'field': 'currency',
        'validate_type': ['require']
    },
    {
        'field': 'tx_ref_id',
        'validate_type': ['string']
    },
    {
        'field': 'description',
        'validate_type': ['max'],
        'validate_params': {'max': 255}
    },
    {
        'field': 'mobile',
        'validate_type': ['require', 'numeric']
    },
    {
        'field': 'name',
        'validate_type': ['require', 'max'],
        'validate_params': {'max': 50}
    },
    {
        'field': 'payment_method',
        'validate_type': ['require', 'enum'],
        'validate_params': {'enum': ['WALLET','ALIPAY']}
    },
    {
        'field': 'tmn_token',
        'validate_type': ['require']
    }
];
export default chargePayment