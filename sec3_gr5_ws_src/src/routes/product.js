const express = require('express')
const router = express.Router();

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', async (req, res) => {
    console.log(`Req: /api/product`)
    try {
        const result = await dbClient.query('SELECT * FROM Product;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

module.exports = router;