const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// Env variables
require('dotenv').config()

const app = express();

//JSON Parser and CORS
app.use(bodyParser.json())
app.use(cors())

//Import Routes
const userRoute = require('./routes/users')
const orderRoute = require('./routes/orders.js')
const productsRoute = require('./routes/products.js')

// API Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productsRoute);

app.get('/', function(req, res){
    res.json({"version": "v1.0.0"})
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});
