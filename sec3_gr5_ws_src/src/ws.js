require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
app.use(express.json())

const productRoutes = require('./routes/product')
const accountRoutes = require('./routes/account')

app.use('/api/product', productRoutes)
app.use('/api/account', accountRoutes)

app.use((req, res) => {
    // console.log(`Req: ${req.url}`)
    res.status(402).json([{status: 402, error: 'No Content'}])
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
