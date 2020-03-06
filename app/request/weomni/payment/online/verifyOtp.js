const verifyOtp = [
    {
        'field': 'otp_code',
        'validate_type': ['require']
    },
    {
        'field': 'otp_ref',
        'validate_type': ['require']
    },
    {
        'field': 'auth_code',
        'validate_type': ['require']
    },
    {
        'field': 'mobile',
        'validate_type': ['require','numeric']
    }
];

export default verifyOtp