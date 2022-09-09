const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true, // Remove all blankspace from start and end.
      maxLength: [100, 'Product name cannot exceed 100 characters']
   },
   price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [100, 'Product price cannot exceed 5 characters'],
      default: 0.0
   },
   description: {
      type: String,
      required: [true, 'Please enter product description']
   },
   ratings: {
      type: Number,
      default: 0
   },
   images: [
      {
         public_id: { // id of images from cloudanary.
            type: String,
            required: true
         },
         url: { // url of images from cloudanary.
            type: String,
            required: true
         }
      }
   ],
   category: {
      type: String,
      required: [true, 'Please select category for this product'],
      enum: {
         values: [
            'Electronics',
            'Cameras',
            'Laptop',
            'Accessories',
            'Headphones',
            'Food',
            'Books',
            'Clothes/Shoes',
            'Beauty/Health',
            'Sports',
            'Outdoor',
            'Home'
         ],
         message: 'Please select correct category for product'
      }
   },
   seller: {
      type: String,
      required: [true, 'Please enter product seller']
   },
   stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      maxLength: [5, 'Product stock cannot exceed 5 characters'],
      default: 0
   },
   numOfReviews: {
      type: Number,
      default: 0
   },
   reviews: [
      {
         name: {
            type: String,
            required: true
         },
         rating: {
            type: Number,
            required: true
         },
         comment: {
            type: String,
            required: true
         }
      }
   ],
   createdAt: {
      type: Date,
      default: Date.now
   }
})


module.exports = mongoose.model('Product', productSchema);