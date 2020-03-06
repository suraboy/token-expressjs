const create = [
    {
        'field': 'amount',
        'validate_type': ['require', 'numeric', 'min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'order_id',
        'validate_type': ['require', 'numeric', 'min', 'unique'],
        'validate_params': {'min': 1, 'table_name': 'truemoney_payment_transactions', 'column_name': 'order_id'}
    },
    {
        'field': 'client_id',
        'validate_type': ['require', 'numeric', 'min'],
        'validate_params': {'min': 1}
    },
    {
        'field': 'tx_ref_id',
        'validate_type': ['string', 'unique'],
        'validate_params': {'table_name': 'truemoney_payment_transactions', 'column_name': 'isv_payment_ref'}
    },
    {
        'field': 'payment_id',
        'validate_type': ['string', 'unique'],
        'validate_params': {'table_name': 'truemoney_payment_transactions', 'column_name': 'payment_id'}
    },
    {
        'field': 'payment_code',
        'validate_type': ['require', 'string']
    },
    {
        'field': 'payment_type',
        'validate_type': ['require', 'enum'],
        'validate_params': {'enum': ['online', 'offline']}
    },
    {
        'field': 'payment_by',
        'validate_type': ['in'],
        'validate_params': {'in': ['app', 'pos', 'tcg_bs', 'horeca_bs']}
    },
    {
        'field': 'status',
        'validate_type': ['require', 'enum'],
        'validate_params': {'enum': ['success', 'fail']}
    },
    {
        'field': 'description',
        'validate_type': ['max'],
        'validate_params': {'max': 255}
    },
    {
        'field': 'log_response',
        'validate_type': ['require', 'string']
    },
    {
        'field': 'reconcile_status',
        'validate_type': ['enum'],
        'validate_params': {'enum': ['0', '1']}
    },
];

export default create
