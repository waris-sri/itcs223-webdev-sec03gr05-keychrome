const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', async (req, res) => {
  console.log(`Req: /api/account`)
  try {
    const result = await dbClient.query(`SELECT accountid,
                                                    firstname,
                                                    lastname,
                                                    email
--                                                     registerdate,
--                                                     logintime
                                             FROM Account;`)
    res.send(result.rows)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

// POST /api/account — Create a new account
router.post('/', async (req, res) => {
  const { accountid, firstname, lastname, email, password } = req.body
  console.log(`Req: POST /api/account`)
  try {
    await dbClient.query(
      `INSERT INTO account (accountid, firstname, lastname, email, password)
             VALUES ($1, $2, $3, $4, $5)`,
      [accountid, firstname, lastname, email, password],
    )
    res.status(201).json({ message: 'Account created successfully', accountid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/account/:accountid — Modify an existing account
router.put('/:accountid', async (req, res) => {
  const { accountid } = req.params
  const { firstname, lastname, email, password } = req.body
  console.log(`Req: PUT /api/account/${accountid}`)
  try {
    const result = await dbClient.query(
      `UPDATE account
             SET firstname = $1,
                 lastname  = $2,
                 email     = $3,
                 password  = $4
             WHERE accountid = $5`,
      [firstname, lastname, email, password, accountid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Account ${accountid} not found` })
    }
    res.status(200).json({ message: 'Account updated successfully', accountid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/account/:accountid — Delete an account
router.delete('/:accountid', async (req, res) => {
  const { accountid } = req.params
  console.log(`Req: DELETE /api/account/${accountid}`)
  try {
    // Delete dependent manage records first to satisfy FK constraints
    await dbClient.query(`DELETE FROM manage WHERE accountid = $1`, [accountid])
    const result = await dbClient.query(
      `DELETE FROM account WHERE accountid = $1`,
      [accountid],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Account ${accountid} not found` })
    }
    res.status(200).json({ message: 'Account deleted successfully', accountid })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.get('/:accountid', async (req, res) => {
  const accountid = req.params.accountid
  console.log(`Req: /api/account/${accountid}`)

  try {
    const queryText = `
			SELECT account.accountid,
			       firstname,
			       lastname,
			       email,
-- 			       registerdate,
-- 			       logintime,
			       manageid,
			       managetime,
			       manageaction,
			       sku
			FROM account
					 JOIN manage ON account.accountid = manage.accountid
			WHERE account.accountid =
			$1;
        `
    const queryValues = [accountid]

    const result = await dbClient.query(queryText, queryValues)

    if (result.rows.length === 0) {
      return res.status(204).json({ error: 'No Content' })
    }

    res.send(result.rows[0])
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

module.exports = router
