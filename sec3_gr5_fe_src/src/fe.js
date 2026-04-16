require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()

// TODO: Hardcoded for now, fix when deploying
const ROOT_URL = 'http://localhost:3003'

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

// For Express
app.use(express.static(path.join(__dirname, '..')))
app.use(express.urlencoded({ extended: true }))
app.use(router)

router.get('/', (req, res) => {
    fetch(ROOT_URL)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/index', {
                title: 'Welcome to Keychrome!',
                products: result,
            })
        })
})

router.get('/search', (req, res) => {
    const hasQuery =
        req.query.searchProductName ||
        req.query.searchProductType ||
        req.query.searchRatingAtLeast
    if (!hasQuery) {
        return res.render('pages/search', {
            title: 'Search | Keychrome',
            products: [],
            query: req.query,
        })
    }

    fetch(`${ROOT_URL}/search?${new URLSearchParams(req.query).toString()}`)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/search', {
                title: 'Search | Keychrome',
                products: result,
                query: req.query,
            })
        })
})

router.get('/members', (req, res) => {
    const members = [
        {name: 'Waris Sripatoomrak', role: 'Team Member', img: 'waris' },
        {name: 'Wachiravich Thaosiri', role: 'Team Member', img: 'wachiravich' },
        {name: 'Warawuth Ngamluea', role: 'Team Member', img: 'warawuth' },
        {name: 'Zwe Nyan Zaw', role: 'Team Member', img: 'zwe' },
    ]

    res.render('pages/members', {
        title: 'Team Members | Keychrome',
        members
    })
})

router.get('/admin-login', (req, res) => {
    res.render('pages/admin-login', {
        title: 'Administrator Login | Keychrome',
    })
})

router.get('/product/:sku', (req, res) => {
    fetch(`${ROOT_URL}/api/product/${req.params.sku}`)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/product-view', {
                title: 'Product View | Keychrome',
                productInfo: result,
            })
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

router.use((req, res) => {
    console.log(`Req: ${req.url}`)
    res.status(404).render('pages/404-error.ejs', {
        title: '404! | Keychrome',
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`)
})
