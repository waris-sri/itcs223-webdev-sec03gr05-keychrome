require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
app.use(express.json());

const productRoutes = require('./routes/product');

app.use('/api/product', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});