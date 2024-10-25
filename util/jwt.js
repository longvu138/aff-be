// utils/jwt.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = user => {
    return jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export { generateToken, verifyToken }
