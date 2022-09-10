const ErrorHandler = require('../utils/errorHandler');

// This arrow function is a middleware that takes four parameters.
// err is an Error Handler object.
module.exports = (err, req, res, next) => {
    // err.statusCode = err.statusCode || 500
    // err.message = err.message || 'Internal Server Error'

    // res.status(err.statusCode).json({
    //     success: false,
    //     error: err.stack
    // })

    // Second way
    code = err.statusCode || 500
    msg = err.message || 'Internal Server Error'

    res.status(code).json({
        success: false,
        error: err.stack
    })

}

// There are two types of errors handler.
// a) Development Mode :- In this mode, we will print all error stack for developers.
// b) Production Mode :- In this mode, we will print error message for non programmer user.