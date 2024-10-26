// models/index.js
import sequelize from '../config/database.js'
import Category from './categories.js'
import Products from './product.js'
import User from './product.js'

// Tạo liên kết giữa các model
const syncDatabase = async () => {
    try {
        // force:true, 
        await sequelize.sync({ alter: true })
        console.log('Database synced')
    } catch (error) {
        console.error('Error syncing database:', error)
    }
}

export { User, syncDatabase }
