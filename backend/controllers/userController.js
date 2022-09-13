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

    res.status(201).json({
        success: true,
        user
    })
})

// It controls authentication.