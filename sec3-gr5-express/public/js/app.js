require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
// For Express
app.use(express.static(path.join(__dirname, '..')))
app.use(express.urlencoded({ extended: true }))
app.use(router)

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Welcome to Keychrome!',
    })
})

router.get('/search', (req, res) => {
    res.render('pages/search', {
        title: 'Search | Keychrome',
    })
})

router.get('/members', (req, res) => {
    res.render('pages/members', {
        title: 'Team Members | Keychrome',
    })
})

router.get('/admin-login', (req, res) => {
    res.render('pages/admin-login', {
        title: 'Administrator Login | Keychrome',
    })
})

router.get('/product-view', (req, res) => {
    res.render('pages/product-view', {
        title: 'Product View | Keychrome',
    })
})

router.get('/privacy-policy', (req, res) => {
    res.render('pages/privacy-policy', {
        title: 'Privacy Policy | Keychrome',
    })
})

router.get('/refund-policy', (req, res) => {
    res.render('pages/refund-policy', {
        title: 'Refund Policy | Keychrome',
    })
})

router.get('/tos', (req, res) => {
    res.render('pages/tos', {
        title: 'Terms of Service | Keychrome',
    })
})

router.get('/test-db', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM Account;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

router.get('/test-img', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM Image;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

router.use((req, res) => {
    console.log(`Req: ${req.url}`)
    res.status(404).render('pages/not-found.ejs', {
        title: '404! | Keychrome',
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`)
})
