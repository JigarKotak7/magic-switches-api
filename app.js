const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = "mongodb+srv://jigar_kotak:Ivory_3737@cluster0.yejqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


// const productsRoutes = require('./api/routes/products');
const switchesRoutes = require('./api/routes/switches');
// "body-parser": "^1.19.0",

const Switch = require('./api/Models/switch');

const router = require('./api/routes/switches');

// mongoose.connect('mongodb+srv://jigar_kotak:Ivory_3737@cluster0.yejqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// Connect to DB
mongoose.connect(process.env.MONGODB_URI || uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log('Connected to DB!')
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Routes which handle request
// app.use("/", router);

// app.use('/products', productsRoutes);
app.use("/switches", switchesRoutes);
// app.get("/switches", (req, res) => {
//     Switch.find()
//     .select('switchName switchId switchGenericName switchIcon switchStatus deviceId')
//     .exec()
//     .then(docs => {
//         const response = {
//             count: docs.length,
//             switches: docs
//         };
//         console.log(response);
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({message: err});
//     });
// });
// app.use('/', router);

app.use((req, res, next) => {
    const error = new Error('Not Found Any Route');
    error.statusCode = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app;
    