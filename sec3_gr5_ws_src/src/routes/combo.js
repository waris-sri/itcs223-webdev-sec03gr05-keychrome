const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

// GET /api/combo — Get all combos
router.get('/', async (req, res) => {
  console.log(`Req: /api/combo`)
  try {
    const result = await dbClient.query(`SELECT * FROM combo;`)
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// GET /api/combo/:comboid — Get a single combo with its products
router.get('/:comboid', async (req, res) => {
  const { comboid } = req.params
  console.log(`Req: /api/combo/${comboid}`)
  try {
    const queryText = `
            SELECT c.comboid,
                   c.price AS combo_price,
                   p.sku,
                   p.series,
                   p.description,
                   p.price AS product_price,
                   p.type
            FROM combo c
                     LEFT JOIN product p ON p.comboid = c.comboid
            WHERE c.comboid = $1;
        `
    const result = await dbClient.query(queryText, [comboid])

    if (result.rows.length === 0) {
      return res.status(204).json({ error: 'No Content' })
    }

    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// POST /api/combo — Create a new combo
router.post('/', async (req, res) => {
  const { comboid, price } = req.body
  console.log(`Req: POST /api/combo`)
  try {
    await dbClient.query(`INSERT INTO combo (comboid, price) VALUES ($1, $2)`, [
      comboid,
      price,
    ])
    res.status(201).json({ message: 'Combo created successfully', comboid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/combo/:comboid — Update a combo's price
router.put('/:comboid', async (req, res) => {
  const { comboid } = req.params
  const { price } = req.body
  console.log(`Req: PUT /api/combo/${comboid}`)
  try {
    const result = await dbClient.query(
      `UPDATE combo SET price = $1 WHERE comboid = $2`,
      [price, comboid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Combo ${comboid} not found` })
    }
    res.status(200).json({ message: 'Combo updated successfully', comboid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/combo/:comboid — Delete a combo
router.delete('/:comboid', async (req, res) => {
  const { comboid } = req.params
  console.log(`Req: DELETE /api/combo/${comboid}`)
  try {
    // Unlink products referencing this combo before deleting
    await dbClient.query(
      `UPDATE product SET comboid = NULL WHERE comboid = $1`,
      [comboid],
    )
    const result = await dbClient.query(
      `DELETE FROM combo WHERE comboid = $1`,
      [comboid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Combo ${comboid} not found` })
    }
    res.status(200).json({ message: 'Combo deleted successfully', comboid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
