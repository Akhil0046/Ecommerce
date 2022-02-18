const {
    cart
} = require('../model/cart-model');
const {
    product
} = require('../model/product-model');

const getAllCartDetails = async (req, res, next) => {
    try {
        const cartData = await cart.find();
        if (cartData) {
            res.status(200).json({
                error: false,
                message: 'cart data fetched successfully',
                response: cartData
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
const addcartDetails = async (req, res, next) => {
    try {
        const {
            name,
            price,
            quantity,
        } = req.body;

        let cartData = await cart.create({
            name: name,
            price: price,
            quantity: quantity,
        });

        res.send({
            error: false,
            message: "cart details added successfully",
            response: cartData
        })

    } catch (err) {
        next(err.message)
    }
}

const UpdatecartdDetails = async (req, res, next) => {
    try {
        const {
            name,
            price,
            quantity,
        } = req.body;

        let editcartDetails = await cart.findByIdAndUpdate({
            _id: req.params.id
        }, {
            name: name,
            price: price,
            quantity: quantity,
        }, {
            new: true
        })

        res.status(200).json({
            error: false,
            message: "cart details updated sucessfully",
            response: editcartDetails
        })
    } catch (err) {
        next(err.message)
    }
}
const DeletecartdDetails = async (req, res, next) => {
    try {
        const {
            name,
            price,
        } = req.body;

        let deleteCartDetails = await cart.findByIdAndDelete({
            _id: req.params.id
        })

        res.status(200).json({
            error: false,
            message: "Cart details deleted sucessfully",
            response: deleteCartDetails
        })
    } catch (err) {
        next(err.message)
    }
}
const addproductToCart = async (req, res, next) => {
    try {
        const {
            quantity,
            productId
        } = req.body;
        let productData = await product.findById({
            _id: productId
        });
        if (productData) {
         let cartData=   await cart.findByIdAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    name: productData.name,
                    price: productData.price,
                    quantity: quantity,
                    productId: productData._id
                }
            },{new:true});
            res.send({
                error: false,
                message: "product added to cart successfully",
                response: cartData
            })
        }
        

    } catch (err) {
        next(err.message)
    }
}
const deleteProductFormCart = async (req, res, next) => {
    try {
        const {
            productId
        } = req.body;
        console.log(req.body);
        console.log();
        let deleteCartDetails = await cart.deleteOne({
            productId: req.params.productId
        })
        res.status(200).json({
            error: false,
            message: "deleted from cart sucessfully",
            response: deleteCartDetails
        })
        

    } catch (err) {
        next(err.message)
    }
}
module.exports = {
    getAllCartDetails,
    addcartDetails,
    UpdatecartdDetails,
    DeletecartdDetails,
    addproductToCart,
    deleteProductFormCart
}