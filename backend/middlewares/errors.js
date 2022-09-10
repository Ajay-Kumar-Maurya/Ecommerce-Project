const ErrorHandler = require('../utils/errorHandler');

// This arrow function is a middleware that takes four parameters.
// err is an Error Handler object.
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error:err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message = err.message

        res.status(error.statusCode).json({
            success: false,
            errMessage: error.message || 'Internal Server Error'
        })
    }
    

}

// There are two types of errors handler.
// a) Development Mode :- In this mode, we will print all error stack for developers.
// b) Production Mode :- In this mode, we will print error message for non programmer user.