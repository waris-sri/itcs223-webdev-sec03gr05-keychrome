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

router.get('/', async (req, res) => {
    try {
        const result = await dbClient.query(`SELECT 
  p.SKU AS SKU, 
  CONCAT_WS(' ',
    'Keychrome',
    Series,
    Version,
    SwitchType,
    Switch,
    type
  ) AS Name,
  rating AS Rating,
  price AS Price,

  (
    SELECT ARRAY_AGG(m.source)
    FROM Image m
    WHERE m.SKU = p.SKU
  ) AS Images,

  ARRAY_REMOVE(ARRAY[
    CASE WHEN p.NewArrival THEN 'new-arrival' END,
    CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
    CASE 
      WHEN COALESCE((
        SELECT SUM(s.Amount)
        FROM Stocks s
        WHERE s.sku = p.SKU
      ), 0) = 0 THEN 'sold-out'
    END
  ], NULL) AS status

FROM Product p ORDER BY p.rating DESC LIMIT 10;`)
        res.render('pages/index', {
            title: 'Welcome to Keychrome!',
            products: result.rows,
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Something broke!')
    }
})

router.get('/search', (req, res) => {
    res.render('pages/search', {
        title: 'Search | Keychrome',
    })
})

router.get('/form-submit', (req, res) => {
    // TODO: Complete the search function.
    return 'Still work in progress!'
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

router.get('/test-bestseller', async (req, res) => {
    const result = await dbClient.query(`SELECT 
  p.SKU AS SKU, 
  CONCAT_WS(' ',
    'Keychrome',
    Series,
    Version,
    SwitchType,
    Switch,
    type
  ) AS Name,
  rating AS Rating,
  price AS Price,

  (
    SELECT ARRAY_AGG(m.source)
    FROM Image m
    WHERE m.SKU = p.SKU
  ) AS Images,

  ARRAY_REMOVE(ARRAY[
    CASE WHEN p.NewArrival THEN 'new-arrival' END,
    CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
    CASE 
      WHEN COALESCE((
        SELECT SUM(s.Amount)
        FROM Stocks s
        WHERE s.sku = p.SKU
      ), 0) = 0 THEN 'sold-out'
    END
  ], NULL) AS status

FROM Product p ORDER BY p.rating DESC LIMIT 10;`)
    res.send(result.rows)
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
