const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

// GET /api/image — Get all images
router.get('/', async (req, res) => {
  console.log(`Req: /api/image`)
  try {
    const result = await dbClient.query(`SELECT * FROM image;`)
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// GET /api/image/:imageid — Get a single image by ID
router.get('/:imageid', async (req, res) => {
  const { imageid } = req.params
  console.log(`Req: /api/image/${imageid}`)
  try {
    const result = await dbClient.query(
      `SELECT * FROM image WHERE imageid = $1;`,
      [imageid],
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

// POST /api/image — Add a new image
router.post('/', async (req, res) => {
  const { imageid, source, sku } = req.body
  console.log(`Req: POST /api/image`)
  try {
    await dbClient.query(
      `INSERT INTO image (imageid, source, sku) VALUES ($1, $2, $3)`,
      [imageid, source, sku],
    )
    res.status(201).json({ message: 'Image added successfully', imageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/image/:imageid — Update an image's source URL
router.put('/:imageid', async (req, res) => {
  const { imageid } = req.params
  const { source } = req.body
  console.log(`Req: PUT /api/image/${imageid}`)
  try {
    const result = await dbClient.query(
      `UPDATE image SET source = $1 WHERE imageid = $2`,
      [source, imageid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Image ${imageid} not found` })
    }
    res.status(200).json({ message: 'Image updated successfully', imageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/image/:imageid — Delete an image
router.delete('/:imageid', async (req, res) => {
  const { imageid } = req.params
  console.log(`Req: DELETE /api/image/${imageid}`)
  try {
    const result = await dbClient.query(
      `DELETE FROM image WHERE imageid = $1`,
      [imageid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Image ${imageid} not found` })
    }
    res.status(200).json({ message: 'Image deleted successfully', imageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
