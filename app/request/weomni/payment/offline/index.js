import activate from './activate';
import charge  from './charge';
import formRequest from '../../../../helpers/customValidate';
import voids from "./voids";
import checkPayment from "./checkpayment";

const request = {
    activate: formRequest(activate),
    charge: formRequest(charge),
    void: formRequest(voids),
    checkPayment: formRequest(checkPayment)
}

export default request