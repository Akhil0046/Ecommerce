const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartData:[{
        name:  { type: String },
        price: { type: String },
        quantity: { type: String},
        productId:{type: String}
    }] 
});


const cart = mongoose.model('cart',cartSchema);

module.exports = {cart}