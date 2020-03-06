import requestOtp from './requestOtp';
import verifyOtp from './verifyOtp';
import chargePayment from './chargePayment';
import cancelPayment from './cancelPayment';
import formRequest from '../../../../helpers/customValidate';

const request = {
    requestOtp: formRequest(requestOtp),
    verifyOtp: formRequest(verifyOtp),
    chargePayment: formRequest(chargePayment),
    cancelPayment: formRequest(cancelPayment)
}

export default request