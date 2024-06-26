const express = require('express');
const app = express();
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const connectDatabase = require('./config/connectDatabase')
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product')
const orders = require('./routes/order')
const user = require('./routes/user')

connectDatabase();
app.use(cors())
app.use(express.json())


app.use('/api/', products)
app.use('/api/', orders)
app.use('/api/', user)

app.listen(process.env.PORT ,  () => {
        console.log(`Server running on port ${process.env.PORT}`)
})