const express = require('express')
const router = express.Router()

const {
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const {isAuthenticatedUser} = require("../middlewares/auth")

router.route('/products').get(isAuthenticatedUser, getProducts)
router.route('/product/:id').get(getSingleProduct)

// Syntax 2 for binding middlewares to express.Router() instance.
// We can also use this syntax bind all other middlewares to express.Router() instance.
// This syntax is mentioned in official express documentation.
// router.get('/products', getProducts)           Line 14
// router.get('/product/:id', getSingleProduct)   Line 15


router.route('/admin/product/new').post(newProduct)


router.route('/admin/product/:id').put(updateProduct)

router.route('/admin/product/:id').delete(deleteProduct)

// Since above operation are on same route, so we can combline them in same line.
// router.route('/admin/product/:id')
//     .put(updateProduct)
//     .delete(deleteProduct)

module.exports = router