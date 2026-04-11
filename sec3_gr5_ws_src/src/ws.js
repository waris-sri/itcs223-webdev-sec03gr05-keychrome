require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../../sec3_gr5_fe_src/views'))
// For Express
app.use(express.static(path.join(__dirname, '..')))
app.use(express.urlencoded({ extended: true }))
app.use(router)

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

// TODO: Make the "500: INTERNAL SERVER ERROR" result page
// FIXME: Change res.render() to res.send() for backend
// FIXME: Change the main path of Express

router.get('/api/v1/search', (req, res) => {
    const { searchProductName, searchProductType, searchRatingAtLeast } =
        req.query
    let sql = `SELECT 
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

FROM Product p WHERE 1=1`
    const params = []

    if (searchProductName && searchProductName.trim() !== '') {
        params.push(`%${searchProductName.trim()}%`)
        sql += ` AND CONCAT_WS(' ',
    Series::text,
    Version::text,
    SwitchType::text,
    Switch::text,
    type::text
  ) ILIKE $${params.length}`
    }

    if (searchProductType && searchProductType.trim() !== '') {
        params.push(`%${searchProductType.trim()}%`)
        sql += ` AND type::text ILIKE $${params.length}`
    }

    if (searchRatingAtLeast && !isNaN(searchRatingAtLeast)) {
        params.push(Number(searchRatingAtLeast))
        sql += ` AND rating >= $${params.length}`
    }

    dbClient.query(sql, params, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Database error')
        }
        res.send(results.rows)
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

router.get('/test-product', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM product;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

router.get('/type', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query(
            'SELECT DISTINCT type FROM product;',
        )
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
