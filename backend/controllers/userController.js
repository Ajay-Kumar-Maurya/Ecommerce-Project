const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Register a user  =>  /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpqwsetsfge',
            url: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})


// Login User  => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user for entered mail in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('User does not exist', 401))
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken()

    res.status(200).json({
        success: true,
        token
    })
})






// It controls authentication.