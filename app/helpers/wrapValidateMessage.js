exports.messageValidate = (errArray) => {
    errArray.sort(function (first, second) {
        return first.param.localeCompare(second.param);
    });
    let currentParams = '';
    let errorMessages = [];
    let errors = {};
    let arrObject = errArray.reduce(function (r, row) {
        r[row.param] = ++r[row.param] || 1;
        return r;
    }, {});


    let countObject = [];
    for (let i in arrObject)
        countObject[i] = arrObject[i];

    let i = 0;
    let count = 1;
    let errArrayLength = errArray.length;
    errArray.forEach((value) => {
        if (value.param != currentParams) {
            if (countObject[currentParams] == i) {
                errors[currentParams] = errorMessages;
                currentParams = value.param;
                errorMessages = [];
                errorMessages.push(value.msg);
                i = 1;
            } else {
                currentParams = value.param;
                errorMessages.push(value.msg);
                i++;
            }
        } else {
            errorMessages.push(value.msg);
            i++;
        }

        if (errArrayLength == count) {
            errors[currentParams] = errorMessages;
        }
        count++;
    });

    return errors
};
//