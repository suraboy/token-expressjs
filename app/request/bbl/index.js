import creditListRequest from './credit-list-request';
import callbackRequest from './callback-request';
import formRequest from '../../helpers/customValidate';

const request = {
    creditListRequest: formRequest(creditListRequest),
    callbackRequest: formRequest(callbackRequest),
}

export default request