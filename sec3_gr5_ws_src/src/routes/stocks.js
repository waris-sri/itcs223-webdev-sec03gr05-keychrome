const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

// GET /api/stocks — Get all stock records
router.get('/', async (req, res) => {
  console.log(`Req: /api/stocks`)
  try {
    const result = await dbClient.query(`SELECT * FROM stocks;`)
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// GET /api/stocks/:stockid — Get a single stock record by stockid
router.get('/:stockid', async (req, res) => {
  const { stockid } = req.params
  console.log(`Req: /api/stocks/${stockid}`)
  try {
    const result = await dbClient.query(
      `SELECT stocks.stockid,
                    stocks.color,
                    stocks.amount,
                    stocks.sku,
                    product.series,
                    product.description
             FROM stocks
                      JOIN product ON product.sku = stocks.sku
             WHERE stocks.stockid = $1;`,
      [stockid],
    )
    if (result.rows.length === 0) {
      return res.status(204).json({ error: 'No Content' })
    }
    res.send(result.rows[0])
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// POST /api/stocks — Add a new stock entry
router.post('/', async (req, res) => {
  const { stockid, color, amount, sku } = req.body
  console.log(`Req: POST /api/stocks`)
  try {
    await dbClient.query(
      `INSERT INTO stocks (stockid, color, amount, sku) VALUES ($1, $2, $3, $4)`,
      [stockid, color || 'Default', amount || 0, sku],
    )
    res
      .status(201)
      .json({ message: 'Stock entry created successfully', stockid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/stocks/:stockid — Update stock color and/or amount
router.put('/:stockid', async (req, res) => {
  const { stockid } = req.params
  const { color, amount } = req.body
  console.log(`Req: PUT /api/stocks/${stockid}`)
  try {
    const result = await dbClient.query(
      `UPDATE stocks
             SET color  = COALESCE($1, color),
                 amount = COALESCE($2, amount)
             WHERE stockid = $3`,
      [color || null, amount !== undefined ? amount : null, stockid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Stock entry ${stockid} not found` })
    }
    res.status(200).json({ message: 'Stock updated successfully', stockid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/stocks/:stockid — Delete a stock entry
router.delete('/:stockid', async (req, res) => {
  const { stockid } = req.params
  console.log(`Req: DELETE /api/stocks/${stockid}`)
  try {
    const result = await dbClient.query(
      `DELETE FROM stocks WHERE stockid = $1`,
      [stockid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Stock entry ${stockid} not found` })
    }
    res.status(200).json({ message: 'Stock deleted successfully', stockid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
