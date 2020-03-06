import createPaymentTransactionRequest from './create-paymenttransaction';
import showPaymentTransactionRequest from './show-paymenttransaction'
import showPaymentTransactionByOrderIdRequest from './credit-card/showPaymentTransactionByOrderId'
import listPaymentTransactionRequest from './list-paymenttransaction'
import formRequest from '../../helpers/customValidate';

const request = {
    createPaymentTransactionRequest: formRequest(createPaymentTransactionRequest),
    showPaymentTransactionRequest: formRequest(showPaymentTransactionRequest),
    listPaymentTransactionRequest: formRequest(listPaymentTransactionRequest),
    showCreditCardTransactionByOrderIdRequest: formRequest(showPaymentTransactionByOrderIdRequest)
}

export default request