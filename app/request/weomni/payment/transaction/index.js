import create from './create';
import formRequest from '../../../../helpers/customValidate';

const request = {
    create: formRequest(create),
}

export default request