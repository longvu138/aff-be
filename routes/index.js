import { errHandler, requestNotFound } from '../middleWare/handleRequest.js'
import productsRoutes from './productsRoutes.js'
import categoryRoutes from './categoryRoutes.js'

const initRouter = app => {
    // app.use("/api", authRoutes);
    app.use('/api/products', productsRoutes)
    app.use('/api/categoy', categoryRoutes)
    // app.get('/redirect', (req, res) => {
    //     const url = req.params.url
    //     res.redirect(url)
    // })
    app.use(requestNotFound)
    app.use(errHandler)
}

export default initRouter
