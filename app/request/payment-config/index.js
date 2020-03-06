import indexPaymentConfigRequest from './index-paymentconfig';
import readPaymentConfigRequest from './read-paymentconfig'
import createPaymentConfigRequest from './create-paymentconfig'
import updatePaymentConfigRequest from './update-paymentconfig'
import deletePaymentConfigRequest from './delete-paymentconfig'

import formRequest from '../../helpers/customValidate';

const request = {
    indexPaymentConfigRequest: formRequest(indexPaymentConfigRequest),
    readPaymentConfigRequest: formRequest(readPaymentConfigRequest),
    createPaymentConfigRequest: formRequest(createPaymentConfigRequest),
    updatePaymentConfigRequest: formRequest(updatePaymentConfigRequest),
    deletePaymentConfigRequest: formRequest(deletePaymentConfigRequest)
}

export default request