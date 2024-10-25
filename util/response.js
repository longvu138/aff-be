/**
 * @param {*} res
 * @param {*} code: mã http response
 * @param {*} errorMessage
 * @returns
 */
export const sendErrorResponse = (res, code, errorMessage, e = null) =>
    res.status(code).send({
        status: 'error',
        message: errorMessage,
        e: e?.toString(),
    })

/**
 * @param {*} res
 * @param {*} code: mã http response
 * @param {*} data: data trả về
 * @param {*} message
 * @returns
 */

export const sendSuccessResponse = (res, code, data, message = 'Successful') =>
    res.status(code).send({
        status: 'success',
        data,
        message,
    })
