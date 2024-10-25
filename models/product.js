// models/user.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'

const Products = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        categories: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
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
        urlSort: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlLong: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
)

export default Products
