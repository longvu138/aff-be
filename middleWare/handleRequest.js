
const requestNotFound = (req, res, next) => {
    const err = new Error(`router ${req.originalUrl} not found`)
    res.status(404)
    next(err)
}

const errHandler = (err, req, res, next) => {
    // nếu trả về 200 trả về 500 lỗi sever
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        message: err?.message,
    })
}

export { requestNotFound, errHandler }
