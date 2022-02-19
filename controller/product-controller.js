const {cart} = require('../model/cart-model');
const {
    product
} = require('../model/product-model');

const getAllproductDetails = async (req, res, next) => {
    try {
        const productData = await product.find();
        if (productData) {
            res.status(200).json({
                error: false,
                message: 'product data fetched successfully',
                response: productData
            })
        } else {
            res.status(404).json({
                error: false,
                message: "No data found",
            })
        }
    } catch (err) {
        next(err.message)
    }
}
const addproductDetails = async (req, res, next) => {
    try {
        const {
            name,
            price,
        } = req.body;

        let productData = await product.insertMany({
            name: name,
            price: price,
        });
       
        res.send({
            error: false,
            message: "product details added successfully",
            response: productData
        })

    } catch (err) {
        next(err.message)
    }
}

const UpdateproductdDetails = async (req, res, next) => {
    try {
        const {
            name,
            price,
            quantity
        } = req.body;

        let editproductDetails = await product.findByIdAndUpdate({
            _id: req.params.id
        }, {
            name: name,
            price: price,
            quantity:quantity
        },{new:true})
        
        res.status(200).json({
            error: false,
            message: "product details updated sucessfully",
            response: editproductDetails
        })
    } catch (err) {
        next(err.message)
    }
}
const DeleteproductdDetails = async (req, res, next) => {
    try {

        let deleteproductDetails = await product.findByIdAndDelete({
            _id: req.params.id
        })
        
        res.status(200).json({
            error: false,
            message: "product details deleted sucessfully",
            response: deleteproductDetails
        })
    } catch (err) {
        next(err.message)
    }
}
module.exports = {
    getAllproductDetails,
    addproductDetails,
    UpdateproductdDetails,
    DeleteproductdDetails,
}