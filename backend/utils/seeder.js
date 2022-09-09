const Product = require('../models/product');
const dotenv = require('dotenv'); // imported to connect database
const connectDatabase = require('../config/database');

const products = require('../data/products');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {
        // Delete all the data from database
        await Product.deleteMany();
        console.log('Products are deleted');

        // Insert data from file to database
        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()

// If we just want to append data, we should remove line 15.
// We want this file to run, when we run our server. We create script for seeder in package.json.