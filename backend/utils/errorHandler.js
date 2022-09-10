// Error Handler Class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // constructor of parent class
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
        // This method creates a .stack property on obj that returns a string
        // representing the point in the code at which Error.captureStackTrace (obj) was called.
    }
}
// We cannot use it right now, we need to create errorMiddleware.
// Then we can use error handler class to handle errors.

module.exports = ErrorHandler