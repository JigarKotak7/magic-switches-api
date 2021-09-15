const mongoose = require('mongoose');

const product = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    mrp: Number
});

module.exports = mongoose.model('Product', product);