import { Sequelize } from 'sequelize'
import { DB_CONFIG } from '../util/config.js'

const sequelize = new Sequelize(DB_CONFIG.DB_NAME, DB_CONFIG.DB_USERNAME, DB_CONFIG.DB_PASSWORD || null, {
    host: DB_CONFIG.DB_HOST,
    dialect: DB_CONFIG.DB_DIALECT,
    timezone: DB_CONFIG.DB_TIMEZONE,
    logging: DB_CONFIG.DB_LOGGING,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
})

export default sequelize
