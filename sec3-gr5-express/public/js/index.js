const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const router = express.Router()
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(router)

const {Client} = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', (req, res) => {
    res.send('Hello')
})

router.get('/test-db', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM account;')

        res.send(result.rows)
    } catch
        (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`)
})