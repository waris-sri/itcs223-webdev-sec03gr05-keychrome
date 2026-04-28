require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()

const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWP_SECRET_KEY
const jwtExpireTime = '1h'

// TODO: Hardcoded for now, fix when deploying
const ROOT_URL = process.env.ROOT_URL

// For EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

// For Express
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

let loginDetail = { user: null, sessionTime: null }

app.use((req, res, next) => {
    const token = req.cookies['login-token']

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY)
            let sessionTime = decoded.exp - decoded.iat
            let currentTimeInSeconds = Math.floor(Date.now() / 1000)
            let sessionTimeLeft = decoded.exp - currentTimeInSeconds
            loginDetail = {
                user: decoded.username,
                sessionTime: sessionTimeLeft,
            }
            req.user = { email: decoded.username }
            res.locals.user = req.user
            // console.log(`Session Time: ${sessionTime}`)
            // console.log(`Session Time Left: ${sessionTimeLeft}`)

            // Renew Token
            if (sessionTime / 2 > sessionTimeLeft) {
                console.log('Renew Token')
                res.clearCookie('login-token')
                const payload = { username: decoded.username }
                const token = jwt.sign(payload, SECRET_KEY, {
                    expiresIn: jwtExpireTime,
                })
                res.cookie('login-token', token)
            }
        } catch (err) {
            console.log('Token Expired')
            res.clearCookie('login-token')
            loginDetail = { user: null, sessionTime: null }
            req.user = null
            res.locals.user = null
        }
        next()
    } else {
        loginDetail = { user: null, sessionTime: null }
        req.user = null
        res.locals.user = null
        next()
    }
})

app.use(router)

router.get('/', (req, res) => {
    console.log(`Req: ${req.url}`)
    // console.log(loginDetail);
    fetch(ROOT_URL)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/index', {
                title: 'Welcome to Keychrome!',
                products: result,
            })
        })
})

router.get('/search', (req, res) => {
    console.log(`Req: /search?${new URLSearchParams(req.query).toString()}`)
    const hasQuery =
        req.query.searchProductName ||
        req.query.searchProductType ||
        req.query.searchRatingAtLeast
    if (!hasQuery) {
        return res.render('pages/search', {
            title: 'Search | Keychrome',
            products: [],
            query: req.query,
        })
    }

    fetch(`${ROOT_URL}/search?${new URLSearchParams(req.query).toString()}`)
        .then((result) => result.json())
        .then((result) => {
            res.render('pages/search', {
                title: 'Search | Keychrome',
                products: result,
                query: req.query,
            })
        })
})

router.get('/members', (req, res) => {
    console.log(`Req: ${req.url}`)
    const members = [
        {
            name: 'Waris Sripatoomrak',
            role: 'Team Member',
            img: 'waris',
            instagram: 'https://www.instagram.com/waris.beam/',
            linkedin: 'https://www.linkedin.com/in/waris-sri/',
            github: 'https://github.com/waris-sri',
        },
        {
            name: 'Wachiravich Thaosiri',
            role: 'Team Member',
            img: 'wachiravich',
            instagram: 'https://www.instagram.com/undwc_/',
            linkedin:
                'https://www.linkedin.com/in/wachiravich-thaosiri-149b382a5',
            github: 'https://github.com/WachiravichThaosiri',
        },
        {
            name: 'Warawuth Ngamluea',
            role: 'Team Member',
            img: 'warawuth',
            instagram: 'https://www.instagram.com/wwwwuth/',
            linkedin: 'https://www.linkedin.com/in/warawuth-ngamluea-87302739a',
            github: 'https://github.com/warawuth4',
        },
        {
            name: 'Zwe Nyan Zaw',
            role: 'Team Member',
            img: 'zwe',
            instagram: 'https://www.instagram.com/clovis_cast/',
            linkedin: 'https://www.linkedin.com/in/zwe-nyan-zaw/',
            github: 'https://github.com/DreamLineLove',
        },
    ]

    res.render('pages/members', {
        title: 'Team Members | Keychrome',
        members,
    })
})

router.get('/manage', (req, res) => {
    console.log(`Req: ${req.url}`)

    res.render('pages/product-management', {
        title: 'Manage Products | Keychrome',
        success: req.query.success || null,
        successSku: req.query.sku || null,
    })
})

router.get('/manage/add', async (req, res) => {
    console.log(`Req: ${req.url}`)
    const types = await fetch(`${ROOT_URL}/type`).then((result) =>
        result.json(),
    )

    const sku = req.query.sku || ''

    res.render('pages/add-product', {
        title: 'Add Products | Keychrome',
        types,
        sku,
    })
})

router.get('/manage/modify', async (req, res) => {
    console.log(`Req: ${req.url}`)
    const sku = req.query.sku || ''
    const types = await fetch(`${ROOT_URL}/type`).then((r) => r.json())

    const productInfo = sku
        ? await fetch(`${ROOT_URL}/api/product/${sku}`).then((r) =>
              r.status === 204 ? null : r.json(),
          )
        : null

    res.render('pages/modify-product', {
        title: 'Modify Products | Keychrome',
        types,
        productInfo,
    })
})

router.post('/manage/add', async (req, res) => {
    console.log(`Req: POST /manage/add`)
    const {
        sku,
        series,
        productDescription,
        price,
        type,
        sensor,
        switchtype,
        switch: switchVal,
        version,
        layoutversion,
        discountavailable,
        newarrival,
        color,
        amount,
    } = req.body

    const response = await fetch(`${ROOT_URL}/api/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sku,
            series,
            description: productDescription,
            price,
            type,
            sensor,
            switchtype,
            switch: switchVal,
            version,
            layoutversion,
            discountavailable,
            newarrival,
            color,
            amount,
            image_source: null,
        }),
    })

    if (response.ok) {
        res.redirect(`/manage?success=Product+added+successfully&sku=${sku}`)
    } else {
        const data = await response.json()
        res.status(500).send(data.error)
    }
})

router.post('/manage/modify', async (req, res) => {
    const { sku } = req.body

    if (!sku) {
        return res.status(400).render('pages/500-error', {
            title: '400! | Keychrome',
        })
    }

    const useExistingIfEmpty = (newValue, existingValue) => {
        if (newValue === undefined || newValue === null || newValue === '') {
            return existingValue
        }
        return newValue
    }

    try {
        const existingResult = await fetch(`${ROOT_URL}/api/product/${sku}`)

        if (!existingResult.ok) {
            console.error(
                'Failed to fetch existing product:',
                await existingResult.text(),
            )
            return res.status(existingResult.status).render('pages/500-error', {
                title: `${existingResult.status}! | Keychrome`,
            })
        }

        const existingProduct = await existingResult.json()

        const productData = {
            productName: useExistingIfEmpty(
                req.body.productName,
                [
                    'Keychrome',
                    existingProduct.series,
                    existingProduct.version,
                    existingProduct.switchtype,
                    existingProduct.switch,
                    existingProduct.type,
                ]
                    .filter(Boolean)
                    .join(' '),
            ),
            description: useExistingIfEmpty(
                req.body.productDescription,
                existingProduct.description,
            ),
            amount: useExistingIfEmpty(
                req.body.amount,
                existingProduct.stock_amount,
            ),
            series: useExistingIfEmpty(req.body.series, existingProduct.series),
            price: useExistingIfEmpty(req.body.price, existingProduct.price),
            type: useExistingIfEmpty(req.body.type, existingProduct.type),
            color: useExistingIfEmpty(req.body.color, existingProduct.color),
            sensor: useExistingIfEmpty(req.body.sensor, existingProduct.sensor),
            switch: useExistingIfEmpty(req.body.switch, existingProduct.switch),
            switchtype: useExistingIfEmpty(
                req.body.switchtype,
                existingProduct.switchtype,
            ),
            version: useExistingIfEmpty(
                req.body.version,
                existingProduct.version,
            ),
            layoutversion: useExistingIfEmpty(
                req.body.layoutversion,
                existingProduct.layoutversion,
            ),
            discountavailable: req.body.discountavailable
                ? true
                : existingProduct.discountavailable,
            newarrival: req.body.newarrival ? true : existingProduct.newarrival,
        }

        const result = await fetch(`${ROOT_URL}/api/product/${sku}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        if (!result.ok) {
            console.error('Failed to modify product:', await result.text())
            return res.status(result.status).render('pages/500-error', {
                title: `${result.status}! | Keychrome`,
            })
        }

        return res.redirect(
            `/manage?success=Product+modified+successfully&sku=${sku}`,
        )
    } catch (err) {
        console.error('Modify product error:', err)
        return res.status(500).render('pages/500-error', {
            title: '500! | Keychrome',
        })
    }
})

router.post('/manage/delete', async (req, res) => {
    console.log(`Req: POST /manage/delete`)
    const { sku } = req.body

    const response = await fetch(`${ROOT_URL}/api/product/${sku}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        res.redirect('/manage?success=Product+deleted+successfully')
    } else {
        const data = await response.json()
        res.status(500).send(data.error)
    }
})

router.get('/manage/delete', async (req, res) => {
    console.log(`Req: ${req.url}`)
    const sku = req.query.sku || ''

    if (!sku) {
        return res.render('pages/delete-product', {
            title: 'Delete Products | Keychrome',
            productInfo: null,
            error: 'No SKU specified!',
        })
    }

    const productInfo = await fetch(`${ROOT_URL}/api/product/${sku}`).then(
        (r) => (r.status === 204 ? null : r.json()),
    )

    res.render('pages/delete-product', {
        title: 'Delete Products | Keychrome',
        productInfo,
        error: productInfo ? null : `No product found with SKU: ${sku}.`,
    })
})

router.get('/admin-login', (req, res) => {
    console.log(`Req: ${req.url}`)
    if (!req.query.email || !req.query.password) {
        return res.render('pages/admin-login', {
            title: 'Administrator Login | Keychrome',
            success: true,
            error: 'Please enter your email and password.',
        })
    }

    fetch(
        `${ROOT_URL}/admin-login?${new URLSearchParams(req.query).toString()}`,
    ).then((result) => {
        let loginStatus = result.status
        console.log('Login Status:', loginStatus)

        if (loginStatus === 200) {
            const payload = { username: req.query.email }
            const token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: jwtExpireTime,
            })
            res.cookie('login-token', token)
            console.log(jwt.verify(token, SECRET_KEY))
            res.locals.user = req.query.email
            return res.redirect('/')
        } else {
            return res.render('pages/admin-login', {
                title: 'Administrator Login | Keychrome',
                success: false,
                error: 'Invalid credentials!',
            })
        }
    })
})

router.get('/logout', (req, res) => {
    console.log(`Req: ${req.url}`)
    res.clearCookie('login-token')
    return res.redirect('/')
})

router.get('/product/:sku', async (req, res) => {
    console.log(`Req: /product/${req.params.sku}`)

    const result = await fetch(`${ROOT_URL}/api/product/${req.params.sku}`)
    if (result.status === 204)
        return res
            .status(404)
            .render('pages/404-error', { title: '404! | Keychrome' })

    const productInfo = await result.json()

    res.render('pages/product-view', {
        title: 'Product View | Keychrome',
        productInfo: productInfo,
    })
})

router.get('/privacy-policy', (req, res) => {
    console.log(`Req: ${req.url}`)
    res.render('pages/privacy-policy', {
        title: 'Privacy Policy | Keychrome',
    })
})

router.get('/refund-policy', (req, res) => {
    console.log(`Req: ${req.url}`)
    res.render('pages/refund-policy', {
        title: 'Refund Policy | Keychrome',
    })
})

router.get('/tos', (req, res) => {
    console.log(`Req: ${req.url}`)
    res.render('pages/tos', {
        title: 'Terms of Service | Keychrome',
    })
})

// POST /api/product — Proxy to backend
router.post('/api/product', async (req, res) => {
    console.log(`Req: POST /api/product`)
    try {
        const response = await fetch(`${ROOT_URL}/api/product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        })
        const result = await response.json()
        res.status(response.status).json(result)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).json({ error: err.message })
    }
})

// PUT /api/product/:sku — Proxy to backend
router.put('/api/product/:sku', async (req, res) => {
    console.log(`Req: PUT /api/product/${req.params.sku}`)
    try {
        const response = await fetch(
            `${ROOT_URL}/api/product/${req.params.sku}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            },
        )
        const result = await response.json()
        res.status(response.status).json(result)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).json({ error: err.message })
    }
})

// DELETE /api/product/:sku — Proxy to backend
router.delete('/api/product/:sku', async (req, res) => {
    console.log(`Req: DELETE /api/product/${req.params.sku}`)
    try {
        const response = await fetch(
            `${ROOT_URL}/api/product/${req.params.sku}`,
            {
                method: 'DELETE',
            },
        )
        const result = await response.json()
        res.status(response.status).json(result)
    } catch (err) {
        console.error('Server error:', err)
        res.status(500).json({ error: err.message })
    }
})

// Replace the bottom of the file with this:

router.use((req, res) => {
    console.log(`Req: ${req.url}`)
    res.status(404).render('pages/404-error.ejs', {
        title: '404! | Keychrome',
    })
})

module.exports = app;

if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port: ${process.env.PORT}`)
    })
}
