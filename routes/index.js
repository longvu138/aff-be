import { errHandler, requestNotFound } from '../middleWare/handleRequest.js'
import productsRoutes from './productsRoutes.js'
import categoryRoutes from './categoryRoutes.js'

const initRouter = app => {
    // app.use("/api", authRoutes);
    app.use(`${APP_CONFIG.ENV}/api/products`, productsRoutes)
    app.use(`${APP_CONFIG.ENV}/api/category`, categoryRoutes)
    // app.get('/redirect', (req, res) => {
    //     const url = req.params.url
    //     res.redirect(url)
    // })
    app.use(requestNotFound)
    app.use(errHandler)
}

export default initRouter
