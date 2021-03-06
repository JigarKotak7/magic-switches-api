// const express = require('express');
// const router = express.Router();

// const Product = require('../Models/product');
// const mongoose = require('mongoose');

// router.get('/', (req, res, next) => {
//     Product.find()
//     .exec()
//     .then(docs => {
//         console.log(docs);
//         res.status(200).json(docs);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({message: err});
//     });
// });

// router.post('/', (req, res, next) => {
//     const product = new Product({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price,
//         mrp: req.body.mrp
//     });
//     product.save().then(result => {
//         console.log(result);
//         res.status(200).json({
//             message: "Handelling post request /products",
//             createdProduct: result
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
    
// });

// router.get('/:productId', (req, res, next)=>{
//     const id = req.params.productId;
//     Product.findById(id).exec().then(doc => {
//         console.log(doc);
//         if(doc){
//             res.status(200).json(doc);
//         }else{
//             res.status(404).json({message: "No Product Found"});
//         }
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// });

// router.patch('/:productId', (req, res, next)=>{
//     const id = req.params.productId;
//     res.status(200).json({
//         message: "You updated the product",
//         id: id
//     });
// });

// router.delete('/:productId', (req, res, next)=>{
//     const id = req.params.productId;
//     res.status(200).json({
//         message: "You deleted the product",
//         id: id
//     });
// });

// module.exports = router;