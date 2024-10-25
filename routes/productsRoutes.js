// routes/userRoutes.js
import express from 'express'
import {
    createProducts,
    deleteProducts,
    getAllProducts,
    getProductsById,
    updateProducts,
    createProductsByExcel,
} from '../controller/productController.js'
import multer from 'multer'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })
router.get('/', getAllProducts)
router.get('/:id', getProductsById)
router.post('', createProducts)
router.put('/:id', updateProducts)
router.delete('/:id', deleteProducts)
router.post('/imports', upload.single('file'), createProductsByExcel)

export default router
