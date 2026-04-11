require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
app.use(express.json())

const productRoutes = require('./routes/product')
const accountRoutes = require('./routes/account')

app.use('/api/product', productRoutes)
app.use('/api/account', accountRoutes)

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

app.get('/', async (req, res) => {
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
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Something broke!')
    }
})

app.get('/search', (req, res) => {
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

    const hasQuery =
        searchProductName || searchProductType || searchRatingAtLeast

    if (!hasQuery) {
        return res.render('pages/search', {
            title: 'Search | Keychrome',
            products: [],
            query: req.query,
        })
    }

    dbClient.query(sql, params, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Database error')
        }
        res.render('pages/search', {
            title: 'Search | Keychrome',
            products: results.rows,
            query: req.query,
        })
    })
})

// Test API
app.get('/api/v1/search', (req, res) => {
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

app.get('/test-bestseller', async (req, res) => {
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

app.get('/test-db', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM Account;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

app.get('/test-product', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM product;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

app.get('/type', async (req, res) => {
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

app.get('/test-img', async (req, res) => {
    console.log(`Req: ${req.url}`)
    try {
        const result = await dbClient.query('SELECT * FROM Image;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

app.use((req, res) => {
    console.log(`Req: ${req.url}`)
    res.status(402).json([{ status: 402, error: 'No Content' }])
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
