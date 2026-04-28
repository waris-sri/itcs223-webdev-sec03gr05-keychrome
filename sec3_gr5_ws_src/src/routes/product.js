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
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

router.post('/', async (req, res) => {
  console.log(`Req: POST /api/product`)
  const {
    sku,
    series,
    description,
    price,
    type,
    sensor,
    switchtype,
    switch: switchVal,
    version,
    layoutversion,
    discountavailable,
    newarrival,
    rating,
    comboid,
    color,
    amount,
    image_source,
  } = req.body

  // TODO: Add/Modify/Delete Product (Pun edited)
  try {
    await dbClient.query(
      `INSERT INTO product (sku, series, description, price, type, sensor, switchtype, switch, version, layoutversion, discountavailable, newarrival, rating, comboid)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        sku,
        series,
        description,
        price,
        type,
        sensor || null,
        switchtype || null,
        switchVal || null,
        version || null,
        layoutversion || null,
        discountavailable === true ||
          discountavailable === 'true' ||
          discountavailable === 'on',
        newarrival === true || newarrival === 'true' || newarrival === 'on',
        rating || 0,
        comboid || null,
      ],
    )

    const stockid = `${sku}`.substring(0, 15)
    await dbClient.query(
      `INSERT INTO stocks (stockid, color, amount, sku) VALUES ($1, $2, $3, $4)`,
      [stockid, color || 'Default', amount || 0, sku],
    )

    if (image_source) {
      const imageid = `${sku}`.substring(0, 15)
      await dbClient.query(
        `INSERT INTO image (imageid, source, sku) VALUES ($1, $2, $3)`,
        [imageid, image_source, sku],
      )
    }

    res.status(201).json({ message: 'Product added successfully', sku })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/product/:sku — Modify an existing product
router.put('/:sku', async (req, res) => {
  const productSku = req.params.sku
  console.log(`Req: PUT /api/product/${productSku}`)
  const {
    series,
    description,
    price,
    type,
    sensor,
    switchtype,
    switch: switchVal,
    version,
    layoutversion,
    discountavailable,
    newarrival,
    comboid,
    color,
    amount,
    image_source,
  } = req.body

  try {
    const result = await dbClient.query(
      `UPDATE product
                 SET description = $1,
                     series = $2,
                     price = $3,
                     type = $4,
                     sensor = $5,
                     switch = $6,
                     switchtype = $7,
                     version = $8,
                     layoutversion = $9,
                     discountavailable = $10,
                     newarrival = $11
                     WHERE sku = $12`,
      [
        description,
        series,
        price,
        type,
        sensor,
        switchVal,
        switchtype,
        version,
        layoutversion,
        discountavailable,
        newarrival,
        productSku,
      ],
    )

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: `Product with SKU ${productSku} not found` })
    }

    if (color !== undefined || amount !== undefined) {
      await dbClient.query(
        `UPDATE stocks SET color=$1, amount=$2 WHERE sku=$3`,
        [(color || 'Default').substring(0, 15), amount || 0, productSku],
      )
    }

    if (image_source) {
      const existing = await dbClient.query(
        `SELECT imageid FROM image WHERE sku=$1 LIMIT 1`,
        [productSku],
      )
      if (existing.rows.length > 0) {
        await dbClient.query(`UPDATE image SET source=$1 WHERE sku=$2`, [
          image_source,
          productSku,
        ])
      } else {
        const imageid = `${productSku}`.substring(0, 15)
        await dbClient.query(
          `INSERT INTO image (imageid, source, sku) VALUES ($1, $2, $3)`,
          [imageid, image_source, productSku],
        )
      }
    }

    res
      .status(200)
      .json({ message: 'Product updated successfully', sku: productSku })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})
// Pun edited

router.delete('/:sku', async (req, res) => {
  const productSku = req.params.sku
  console.log(`Req: DELETE /api/product/${productSku}`)

  try {
    // Delete dependent rows first to satisfy FK constraints
    await dbClient.query(`DELETE FROM manage WHERE sku=$1`, [productSku])
    await dbClient.query(`DELETE FROM image  WHERE sku=$1`, [productSku])
    await dbClient.query(`DELETE FROM stocks WHERE sku=$1`, [productSku])
    const result = await dbClient.query(`DELETE FROM product WHERE sku=$1`, [
      productSku,
    ])

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: `Product with SKU ${productSku} not found` })
    }

    res
      .status(200)
      .json({ message: 'Product deleted successfully', sku: productSku })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: err.message })
  }
})

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
            stocks.color  AS color,
            image.source  AS image_source
        FROM product
            LEFT JOIN stocks ON stocks.sku = product.sku
            LEFT JOIN (SELECT DISTINCT ON (sku) * FROM image ORDER BY sku, imageid) image ON product.sku = image.sku
        WHERE product.sku = $1;
        `
    const queryValues = [productSku]

    const result = await dbClient.query(queryText, queryValues)

    if (result.rows.length === 0) {
      return res.status(204).json({ error: 'No Content' })
    }

    // if (result.rows.length === 0) {
    //     return res.status(404).json({ error: 'No Content' })
    // }

    res.send(result.rows[0])
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).render('pages/500-error', { title: '500! | Keychrome' })
  }
})

module.exports = router
