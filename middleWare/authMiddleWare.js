// middleware/authMiddleware.js

import { verifyToken } from '../util/jwt.js'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    const token = authHeader.split(' ')[1] // Assuming "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Invalid token format.' })
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded?.user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

const authorize = roles => {
    return (req, res, next) => {
        const userRoles = req?.user?.roles
        if (roles.some(role => userRoles?.includes(role))) {
            next()
        } else {
            res.status(403).send({ error: 'Forbidden' })
        }
    }
}

export { authMiddleware, authorize }
