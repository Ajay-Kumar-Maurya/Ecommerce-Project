const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// Handle Uncaught Exception
// This code must be at the top, otherwise it will not handle the exception.
process.on('uncaughtException', err => {
   console.log(`ERROR: ${err.stack}`)
   console.log('Shutting down due to uncaught exception')
   process.exit(1)
})

// setting up config file
dotenv.config({path : "backend/config/config.env"})


// Connecting to database
connectDatabase()


const server = app.listen(process.env.PORT, () => {
   console.log(`server is listening at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
   console.log(`ERROR: ${err.message}`)
   console.log('Shutting down the server due to Unhandled Promise rejection')
   server.close(() => {
      process.exit(1)
   })
})

/*
A promise is a state machine representation of an asynchronous operation.
It can be in one of 3 states: "pending", "fulfilled", or "rejected".
A pending promise represents an asynchronous operation that's in progress.
A fulfilled promise represents an asynchronous operation that's completed successfully.
A rejected promise represents an asynchronous operation that failed for some reason.
e.g. - trying to connect to a nonexistent MongoDB instance using the MongoDB driver.
e.g. - Invalid connection string (expected connection string to start with "mongodb://" or "mongodb+srv://)
 */