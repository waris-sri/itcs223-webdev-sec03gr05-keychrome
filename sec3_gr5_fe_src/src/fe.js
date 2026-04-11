require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()
// Hard-coded for now
const ROOT_URL = 'http://localhost:3003/'

// FIXME: Change res.render() to res.send() for backend

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
// For Express
app.use(express.static(path.join(__dirname, '..')))
app.use(express.urlencoded({ extended: true }))
app.use(router)

router.get('/', async (req, res) => {
    fetch(ROOT_URL)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/index', {
                title: 'Welcome to Keychrome!',
                products: result,
            })
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

// const p = document.getElementById('test-show-product-info')
router.get('/product/:sku', (req, res) => {
    fetch(`${ROOT_URL}api/product/${req.params.sku}`)
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
