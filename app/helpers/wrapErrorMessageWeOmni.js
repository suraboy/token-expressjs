exports.wrapErrorMessageWeOmni = (error) => {
    let response = {};
    if ((error.status == 404 || error.status == 400) && error.data.errors) {
        response = {
            "errors": {
                "status_code": error.status,
                "message": error.data.errors[0].message
            }
        };
    } else if (Array.isArray(error.data)) {
        response = {
            "errors": {
                "status_code": error.status,
                "message": error.data[0].messsage,
                "errors": error.data[0].fields
            }
        };
    } else if (error.data.ErrorCode) {
        response = {
            "errors": {
                "status_code": error.status,
                "message": error.statusText
            }
        };
    } else if(error.data.error) {
        response = {
            "errors": {
                "status_code": error.status,
                "message": error.data.error
            }
        };
    }else{
        response = {
            "errors": {
                "status_code": error.status,
                "message": error.data.message,
                "errors": error.fields
            }
        };
    }
    return response;
};