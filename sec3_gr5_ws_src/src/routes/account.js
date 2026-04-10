const express = require('express')
const router = express.Router();

const {Client} = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', async (req, res) => {
    console.log(`Req: /api/account`)
    try {
        const result = await dbClient.query('SELECT * FROM Account;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

// TODO: Add/Modify/Delete Product

router.get('/:accountid', async (req, res) => {
    const accountid = req.params.accountid;
    console.log(`Req: /api/account/${accountid}`);

    try {
        const queryText = `
			SELECT account.accountid,
			       firstname,
			       lastname,
			       email,
			       registerdate,
			       logintime,
			       manageid,
			       managetime,
			       manageaction,
			       sku
			FROM account
					 JOIN manage ON account.accountid = manage.accountid
			WHERE account.accountid =
			$1;
        `;
        const queryValues = [accountid];

        const result = await dbClient.query(queryText, queryValues);

        if (result.rows.length === 0) {
            return res.status(204).json({error: 'No Content'});
        }

        res.send(result.rows[0]);

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Something broke!');
    }
});

module.exports = router;