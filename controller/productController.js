import Products from '../models/product.js'
import { paginateAndFilter } from '../util/paginateAndFilter.js'
import { sendErrorResponse, sendSuccessResponse } from '../util/response.js'
import * as XLSX from 'xlsx/xlsx.mjs'
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, size = 20, sort, name, categoryCode } = req.query

        const filterConditions = [
            ['name', name],
            ['categoryCode', categoryCode],
        ]

        const sortConditions = sort ? sort.split(',').map(condition => condition.split(':')) : [['createdAt', 'DESC']]

        const result = await paginateAndFilter(Products, {
            offset: parseInt(page, 10),
            limit: parseInt(size, 10),
            sort: sortConditions,
            filterConditions,
        })

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getProductsById = async (req, res) => {
    const idProducts = req.params.id
    try {
        if (!idProducts) {
            return sendErrorResponse(res, 400, 'id products isRequired')
        }
        const user = await Products.findByPk(
            idProducts,
            //  {attributes: ['username', 'email', 'role', 'enabled'],}
        )
        if (user) {
            const data = { ...user?.dataValues }
            return sendSuccessResponse(res, 200, data, '')
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createProducts = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await Products.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password,
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateProducts = async (req, res) => {
    const { name, url, price, image } = req.body
    try {
        const products = req.params.id
        if (!products) {
            return res.status(400).json({ message: 'Missing id' })
        }
        if (!name || !url || !price || !image) {
            return res.status(400).json({ message: 'Missing name, url, price or image' })
        }

        const productExisting = await Products.findByPk(products)
        if (!productExisting) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const [updated] = await Products.update(req.body, {
            where: { id: req.params.id },
        })
        if (updated) {
            const updatedProduct = await Products.findByPk(req.params.id)
            res.status(200).json(updatedProduct)
        } else {
            res.status(404).json({ error: 'product update failed' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteProducts = async (req, res) => {
    const products = req.params.id
    if (!products) {
        return res.status(400).json({ message: 'Missing id' })
    }
    try {
        // const deleted = await Products.destroy({
        //     where: { id: req.params.id },
        // })
        // if (deleted) {
        //     res.status(204).send()
        // } else {
        //     res.status(404).json({ error: 'Product not found' })
        // }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createProductsByExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        // Đọc file Excel từ buffer (vì multer lưu trữ trong bộ nhớ)
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0] // Lấy tên sheet đầu tiên
        const worksheet = workbook.Sheets[sheetName]

        // Chuyển đổi nội dung của sheet thành một mảng các đối tượng JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null })

        const errors = []
        const products = []

        // Duyệt qua từng dòng trong Excel và kiểm tra dữ liệu
        jsonData.forEach((row, index) => {
            const rowNumber = index + 2 // +2 để đúng với số dòng trong Excel (vì JSON bắt đầu từ 0 và bỏ qua dòng tiêu đề)

            let rowErrors = []

            if (!row['name']) {
                rowErrors.push(`Missing 'name' at row ${rowNumber}`)
            }

            if (!row['urlSort']) {
                rowErrors.push(`Missing 'urlSort' at row ${rowNumber}`)
            }

            if (!row['image']) {
                rowErrors.push(`Missing 'image' at row ${rowNumber}`)
            }

            if (!row['price']) {
                rowErrors.push(`Missing 'price' at row ${rowNumber}`)
            }

            if (rowErrors.length > 0) {
                errors.push(...rowErrors)
            } else {
                // Nếu không có lỗi, thêm vào mảng products
                products.push({
                    categoryCode: row['categoryCode'],
                    name: row['name'],
                    url: row['url'],
                    image: row['image'],
                    price: row['price'],
                    urlSort: row['urlSort'],
                    urlLong: row['urlLong'],
                })
            }
        })

        // Nếu có lỗi, trả về thông báo lỗi
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors,
            })
        }

        // Nếu không có lỗi, lưu sản phẩm vào cơ sở dữ liệu
        await Products.bulkCreate(products)

        res.status(200).json({ message: 'Products imported successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to import products' })
    }
}

export { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts, createProductsByExcel }
