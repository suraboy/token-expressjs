import indexPaymentChannelRequest from './index-paymentchannel';
import readPaymentChannelRequest from './read-paymentchannel'
import createPaymentChannelRequest from './create-paymentchannel'
import updatePaymentChannelRequest from './update-paymentchannel'
import deletePaymentChannelRequest from './delete-paymentchannel'

import formRequest from '../../helpers/customValidate';

const request = {
    indexPaymentChannelRequest: formRequest(indexPaymentChannelRequest),
    readPaymentChannelRequest: formRequest(readPaymentChannelRequest),
    createPaymentChannelRequest: formRequest(createPaymentChannelRequest),
    updatePaymentChannelRequest: formRequest(updatePaymentChannelRequest),
    deletePaymentChannelRequest: formRequest(deletePaymentChannelRequest)
}

export default request