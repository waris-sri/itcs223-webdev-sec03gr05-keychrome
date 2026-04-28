require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT
app.use(express.json())

const productRoutes = require('./routes/product')
const accountRoutes = require('./routes/account')
const comboRoutes = require('./routes/combo')
const imageRoutes = require('./routes/image')
const manageRoutes = require('./routes/manage')
const stocksRoutes = require('./routes/stocks')

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../../sec3_gr5_fe_src/views'))

app.use('/api/product', productRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/combo', comboRoutes)
app.use('/api/image', imageRoutes)
app.use('/api/manage', manageRoutes)
app.use('/api/stocks', stocksRoutes)

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

app.get('/', async (req, res) => {
  console.log(`Req: ${req.url}`)
  try {
    const result =
      await dbClient.query(`SELECT p.SKU                     AS SKU,
                                                    CONCAT_WS(' ',
                                                              'Keychrome',
                                                              Series,
                                                              Version,
                                                              SwitchType,
                                                              Switch,
                                                              type
                                                    )                         AS Name,
                                                    rating                    AS Rating,
                                                    price                     AS Price,

                                                    (SELECT ARRAY_AGG(m.source)
                                                     FROM Image m
                                                     WHERE m.SKU = p.SKU)     AS Images,

                                                    ARRAY_REMOVE(ARRAY [
                                                                     CASE WHEN p.NewArrival THEN 'new-arrival' END,
                                                                     CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
                                                                     CASE
                                                                         WHEN COALESCE((SELECT SUM(s.Amount)
                                                                                        FROM Stocks s
                                                                                        WHERE s.sku = p.SKU), 0) = 0
                                                                             THEN 'sold-out'
                                                                         END
                                                                     ], NULL) AS status

                                             FROM Product p
                                             ORDER BY p.rating DESC
                                             LIMIT 10;`)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
  }
})

app.get('/search', (req, res) => {
  console.log(`Req: ${req.url}`)
  const { searchProductName, searchProductType, searchRatingAtLeast } =
    req.query

  let sql = `SELECT p.SKU                     AS SKU,
                      CONCAT_WS(' ',
                                'Keychrome',
                                Series,
                                Version,
                                SwitchType,
                                Switch,
                                type
                      )                         AS Name,
                      rating                    AS Rating,
                      price                     AS Price,

                      (SELECT ARRAY_AGG(m.source)
                       FROM Image m
                       WHERE m.SKU = p.SKU)     AS Images,

                      ARRAY_REMOVE(ARRAY [
                                       CASE WHEN p.NewArrival THEN 'new-arrival' END,
                                       CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
                                       CASE
                                           WHEN COALESCE((SELECT SUM(s.Amount)
                                                          FROM Stocks s
                                                          WHERE s.sku = p.SKU), 0) = 0 THEN 'sold-out'
                                           END
                                       ], NULL) AS status

               FROM Product p
               WHERE 1 = 1`
  const params = []

  if (searchProductName && searchProductName.trim() !== '') {
    params.push(`%${searchProductName.trim()}%`)
    sql += ` AND CONCAT_WS(' ',
      'Keychrome',
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

  const hasQuery = searchProductName || searchProductType || searchRatingAtLeast
  if (!hasQuery) {
    return res.json([]) // If no query parameters, return blank
  }

  dbClient.query(sql, params, (err, results) => {
    if (err) {
      console.error(err)
      return res
        .status(500)
        .render('pages/500-error', { title: '500! | Keychrome', user: null })
    }
    res.json(results.rows)
  })
})

// // Test API
// app.get('/api/v1/search', (req, res) => {
//     const { searchProductName, searchProductType, searchRatingAtLeast } =
//         req.query
//     let sql = `SELECT
//   p.SKU AS SKU,
//   CONCAT_WS(' ',
//     'Keychrome',
//     Series,
//     Version,
//     SwitchType,
//     Switch,
//     type
//   ) AS Name,
//   rating AS Rating,
//   price AS Price,

//   (
//     SELECT ARRAY_AGG(m.source)
//     FROM Image m
//     WHERE m.SKU = p.SKU
//   ) AS Images,

//   ARRAY_REMOVE(ARRAY[
//     CASE WHEN p.NewArrival THEN 'new-arrival' END,
//     CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
//     CASE
//       WHEN COALESCE((
//         SELECT SUM(s.Amount)
//         FROM Stocks s
//         WHERE s.sku = p.SKU
//       ), 0) = 0 THEN 'sold-out'
//     END
//   ], NULL) AS status

// FROM Product p WHERE 1=1`
//     const params = []

//     if (searchProductName && searchProductName.trim() !== '') {
//         params.push(`%${searchProductName.trim()}%`)
//         sql += ` AND CONCAT_WS(' ',
//       Series::text,
//       Version::text,
//       SwitchType::text,
//       Switch::text,
//       type::text
//     ) ILIKE $${params.length}`
//     }

//     if (searchProductType && searchProductType.trim() !== '') {
//         params.push(`%${searchProductType.trim()}%`)
//         sql += ` AND type::text ILIKE $${params.length}`
//     }

//     if (searchRatingAtLeast && !isNaN(searchRatingAtLeast)) {
//         params.push(Number(searchRatingAtLeast))
//         sql += ` AND rating >= $${params.length}`
//     }

//     dbClient.query(sql, params, (err, results) => {
//         if (err) {
//             console.error(err)
//             return res
//                 .status(500)
//                 .render('pages/500-error', { title: '500! | Keychrome', user: null })
//         }
//         res.send(results.rows)
//     })
// })

app.get('/test-bestseller', async (req, res) => {
  console.log(`Req: ${req.url}`)
  const result = await dbClient.query(`SELECT p.SKU                     AS SKU,
                                                CONCAT_WS(' ',
                                                          'Keychrome',
                                                          Series,
                                                          Version,
                                                          SwitchType,
                                                          Switch,
                                                          type
                                                )                         AS Name,
                                                rating                    AS Rating,
                                                price                     AS Price,

                                                (SELECT ARRAY_AGG(m.source)
                                                 FROM Image m
                                                 WHERE m.SKU = p.SKU)     AS Images,

                                                ARRAY_REMOVE(ARRAY [
                                                                 CASE WHEN p.NewArrival THEN 'new-arrival' END,
                                                                 CASE WHEN p.DiscountAvailable THEN 'discount-available' END,
                                                                 CASE
                                                                     WHEN COALESCE((SELECT SUM(s.Amount)
                                                                                    FROM Stocks s
                                                                                    WHERE s.sku = p.SKU), 0) = 0
                                                                         THEN 'sold-out'
                                                                     END
                                                                 ], NULL) AS status

                                         FROM Product p
                                         ORDER BY p.rating DESC
                                         LIMIT 10;`)
  res.send(result.rows)
})

app.get('/test-db', async (req, res) => {
  console.log(`Req: ${req.url}`)
  console.log(`Req: ${req.url}`)
  try {
    const result = await dbClient.query('SELECT * FROM Account;')
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
  }
})

app.get('/test-product', async (req, res) => {
  console.log(`Req: ${req.url}`)
  console.log(`Req: ${req.url}`)
  try {
    const result = await dbClient.query('SELECT * FROM product;')
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
  }
})

app.get('/type', async (req, res) => {
  console.log(`Req: ${req.url}`)
  console.log(`Req: ${req.url}`)
  try {
    const result = await dbClient.query('SELECT DISTINCT type FROM product;')
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
  }
})

app.get('/test-img', async (req, res) => {
  console.log(`Req: ${req.url}`)
  console.log(`Req: ${req.url}`)
  try {
    const result = await dbClient.query('SELECT * FROM Image;')
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
  }
})

app.get('/admin-login', async (req, res) => {
  console.log(`Req: ${req.url}`)

  if (Object.keys(req.query).length !== 0) {
    console.log('Login Attempt')
    const { email, password } = req.query

    try {
      let dbPassword = await dbClient.query(
        'SELECT password FROM Account WHERE email = $1;',
        [email],
      )
      dbPassword = dbPassword.rows[0].password
      if (password === dbPassword) {
        console.log('Correct Password')
        res.status(200).end()
      } else {
        console.log('Incorrect Password')
        res.status(401).end()
      }
    } catch (err) {
      console.error('Server error:', err)
      res.status(500).render('pages/500-error', { title: '500! | Keychrome', user: null })
    }
  }
})

app.use((req, res) => {
  console.log(`None Req: ${req.url}`)
  res.status(402).json([{ status: 402, error: 'No Content' }])
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
