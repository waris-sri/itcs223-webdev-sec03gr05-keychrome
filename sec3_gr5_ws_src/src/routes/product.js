const express = require('express')
const router = express.Router()

const { Client } = require('pg')
const dbClient = new Client(process.env.SUPABASE_CONNECTION_STRING)
dbClient.connect()

router.get('/', async (req, res) => {
    console.log(`Req: /api/product`)
    try {
        const result = await dbClient.query('SELECT * FROM Product;')
        res.send(result.rows)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

// TODO: Add/Modify/Delete Product

router.get('/:sku', async (req, res) => {
    const productSku = req.params.sku
    console.log(`Req: /api/product/${productSku}`)

    try {
        const queryText = `
			SELECT product.sku,
			       product.series,
			       product.description,
			       product.price,
			       product.type,
			       product.sensor,
			       product.switchtype,
			       product.switch,
			       version,
			       layoutversion,
			       discountavailable,
			       newarrival,
			       rating,
			       comboid,
			       stocks.amount AS stock_amount,
			       image.source  AS image_source
			FROM product
					 JOIN stocks ON stocks.sku = product.sku
				     JOIN image ON product.sku = image.sku
			WHERE product.sku = $1;
        `
        const queryValues = [productSku]

        const result = await dbClient.query(queryText, queryValues)

        if (result.rows.length === 0) {
            return res.status(204).json({ error: 'No Content' })
        }

        res.send(result.rows[0])
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).send('Something broke!')
    }
})

module.exports = router
