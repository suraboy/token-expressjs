import indexPaymentProviderRequest from './index-paymentprovider';
import readPaymentProviderRequest from './read-paymentprovider'
import createPaymentProviderRequest from './create-paymentprovider'
import updatePaymentProviderRequest from './update-paymentprovider'
import deletePaymentProviderRequest from './delete-paymentprovider'

import formRequest from '../../helpers/customValidate';

const request = {
    indexPaymentProviderRequest: formRequest(indexPaymentProviderRequest),
    readPaymentProviderRequest: formRequest(readPaymentProviderRequest),
    createPaymentProviderRequest: formRequest(createPaymentProviderRequest),
    updatePaymentProviderRequest: formRequest(updatePaymentProviderRequest),
    deletePaymentProviderRequest: formRequest(deletePaymentProviderRequest)
}

export default request