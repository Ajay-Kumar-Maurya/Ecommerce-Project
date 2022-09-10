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

        // MongoDB Cast to ObjectId failed Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        // Show error, if values are missing while pushing data
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(values => values.message)
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            errMessage: error.message || 'Internal Server Error'
        })
    }
    

}

// There are two types of errors handler.
// a) Development Mode :- In this mode, we will print all error stack for developers.
// b) Production Mode :- In this mode, we will print error message for non programmer user.