// models/product.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import Category from './categories.js'

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlSort: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlLong: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryCode: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Category,
                key: 'code',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
    },
    {
        timestamps: true,
    },
)

// Thiết lập quan hệ giữa Product và Category
Product.belongsTo(Category, { foreignKey: 'categoryCode', targetKey: 'code', as: 'category' })

export default Product
