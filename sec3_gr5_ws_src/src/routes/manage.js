const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

// GET /api/manage — Get all manage records
router.get('/', async (req, res) => {
  console.log(`Req: /api/manage`)
  try {
    const result = await dbClient.query(`
            SELECT manage.manageid,
                   manage.managetime,
                   manage.manageaction,
                   manage.accountid,
                   manage.sku,
                   account.firstname,
                   account.lastname
            FROM manage
                     JOIN account ON account.accountid = manage.accountid
            ORDER BY manage.managetime DESC;
        `)
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// GET /api/manage/:manageid — Get a single manage record
router.get('/:manageid', async (req, res) => {
  const { manageid } = req.params
  console.log(`Req: /api/manage/${manageid}`)
  try {
    const result = await dbClient.query(
      `SELECT manage.manageid,
                    manage.managetime,
                    manage.manageaction,
                    manage.accountid,
                    manage.sku,
                    account.firstname,
                    account.lastname
             FROM manage
                      JOIN account ON account.accountid = manage.accountid
             WHERE manage.manageid = $1;`,
      [manageid],
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

// POST /api/manage — Log a new manage action
router.post('/', async (req, res) => {
  const { manageid, managetime, manageaction, accountid, sku } = req.body
  console.log(`Req: POST /api/manage`)
  try {
    await dbClient.query(
      `INSERT INTO manage (manageid, managetime, manageaction, accountid, sku)
             VALUES ($1, $2, $3, $4, $5)`,
      [manageid, managetime || new Date(), manageaction, accountid, sku],
    )
    res
      .status(201)
      .json({ message: 'Manage record created successfully', manageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/manage/:manageid — Update a manage record
router.put('/:manageid', async (req, res) => {
  const { manageid } = req.params
  const { manageaction, sku } = req.body
  console.log(`Req: PUT /api/manage/${manageid}`)
  try {
    const result = await dbClient.query(
      `UPDATE manage
             SET manageaction = COALESCE($1, manageaction),
                 sku          = COALESCE($2, sku)
             WHERE manageid = $3`,
      [manageaction || null, sku || null, manageid],
    )
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: `Manage record ${manageid} not found` })
    }
    res
      .status(200)
      .json({ message: 'Manage record updated successfully', manageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/manage/:manageid — Delete a manage record
router.delete('/:manageid', async (req, res) => {
  const { manageid } = req.params
  console.log(`Req: DELETE /api/manage/${manageid}`)
  try {
    const result = await dbClient.query(
      `DELETE FROM manage WHERE manageid = $1`,
      [manageid],
    )
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: `Manage record ${manageid} not found` })
    }
    res
      .status(200)
      .json({ message: 'Manage record deleted successfully', manageid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
