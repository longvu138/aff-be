// // controllers/authController.js
// import bcrypt from 'bcryptjs'
// import User from '../models/user.js'
// import { sendErrorResponse, sendSuccessResponse } from '../util/response.js'
// import { sendEmail } from '../util/sendMail.js'
// import { generateToken } from '../util/jwt.js'
// import crypto from 'crypto'
// import { btoa } from 'buffer'
// /**
//  * Tạo mã OTP an toàn
//  * @returns {string} Mã OTP ngẫu nhiên 6 chữ số
//  */
// const generateSecureOtp = () => {
//     return crypto.randomInt(100000, 999999).toString()
// }

// /**
//  * đăng ký
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// const register = async (req, res) => {
//     const { username, email, password } = req.body

//     try {
//         if (!username || !email || !password) {
//             return sendErrorResponse(res, 400, 'field cannot be null')
//         }

//         const existingUser = await User.findOne({ where: { email } })

//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' })
//         }

//         const otp = generateSecureOtp()
//         const otpExpiry = new Date(Date.now() + 2 * 60 * 1000) // Hết hạn sau 15 phút

//         const emailContent = `
//             <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//                 <h2 style="color: #007BFF;">Chúc mừng!</h2>
//                 <p>Tài khoản của bạn đã được đăng ký thành công.</p>
//                 <p>Vui lòng kích hoạt tài khoản bằng cách nhấn vào đường link bên dưới:</p>
//                 <p style="text-align: left;">
//                     <a href="http://localhost/verify?email=${btoa(email)}&code=${btoa(
//             otp,
//         )}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Kích hoạt tài khoản</a>
//                 </p>
//                 <p>Ngoài ra, bạn cũng có thể sử dụng mã OTP sau để xác thực:</p>
//                 <h3 style="text-align: left; color: #28A745;">${otp}</h3>
//                 <p style="color:red;"><i>Lưu ý: OTP chỉ có thời hạn là <strong>15p</strong></i></p>
//                 <hr style="border: 0; border-top: 1px solid #ddd;" />
//                 <p style="font-size: 12px; color: #888;">Nếu bạn không yêu cầu tài khoản này, vui lòng bỏ qua email này.</p>    
//             </div>
//         `

//         const resultSendMail = await sendEmail({
//             to: email,
//             subject: 'Verify Account',
//             message: emailContent,
//         })
//         if (resultSendMail) {
//             const user = await User.create({
//                 username,
//                 email,
//                 password: password,
//                 otp: otp,
//                 otpExpiry: otpExpiry,
//             })
//             if (user) {
//                 // Tạo một hẹn giờ để xóa OTP sau 15 phút nếu chưa xác thực
//                 setTimeout(async () => {
//                     const currentUser = await User.findOne({ where: { email } })
//                     if (currentUser && !currentUser.enabled) {
//                         currentUser.otp = null
//                         currentUser.otpExpiry = null
//                         await currentUser.save()
//                     }
//                 }, 2 * 60 * 1000)

//                 return sendSuccessResponse(
//                     res,
//                     200,
//                     { email: user?.email },
//                     'User registered successfully. Please check your email to verify your account.',
//                 )
//             }
//             return sendErrorResponse(res, '500', 'Error when send insert user')
//         } else {
//             return sendErrorResponse(res, '500', 'Error when send otp')
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, error.message)
//     }
// }

// /**
//  * Đăng nhập
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// const login = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Missing value' })
//         }

//         const user = await User.findOne({ where: { email } })

//         if (!user) {
//             return res.status(400).json({ message: 'User not found' })
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password)

//         if (!isPasswordValid) {
//             return sendErrorResponse(res, 400, 'Invalid password')
//         }

//         if (!user?.enabled) {
//             return sendErrorResponse(res, 400, 'unverified account')
//         }
//         delete user.dataValues.password
//         delete user.dataValues.enabled
//         const userInfo = { ...user.dataValues }
//         const token = generateToken(userInfo)
//         const data = { token: token, userInfo: userInfo }
//         return sendSuccessResponse(res, 200, data, 'login successfully')
//     } catch (error) {
//         return sendErrorResponse(res, 500, error.message)
//     }
// }

// const logout = (req, res) => {
//     res.status(200).json({ message: 'Logout successful' })
// }

// /**
//  * lấy thông tin user từ token
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// const getUserFromToken = async (req, res) => {
//     // try {
//     //     const profile = req?.user
//     //     console.log(profile)
//     //     if (!profile) {
//     //         return res.status(400).json({ message: 'User not found' })
//     //     }
//     //     res.status(200).json({ data: profile })
//     // } catch (error) {
//     //     res.status(500).json({ error: error.message })
//     // }
// }

// const verifyAccount = async (req, res) => {
//     const { email, otp } = req.body

//     try {
//         if (!email) {
//             return sendErrorResponse(res, 400, 'email required')
//         }

//         const user = await User.findOne({ where: { email } })

//         if (!user) {
//             return sendErrorResponse(res, 400, 'User not found')
//         }

//         if (user.enabled) {
//             return sendErrorResponse(res, 400, 'Account already verified')
//         }

//         if (user.otp !== otp || new Date() > user.otpExpiry) {
//             return sendErrorResponse(res, 400, 'Invalid or expired OTP')
//         }

//         user.enabled = true
//         user.otp = null
//         user.otpExpiry = null
//         const verifySuccess = await user.save()

//         if (verifySuccess) {
//             delete user.dataValues.password
//             delete user.dataValues.enabled
//             const userInfo = { ...user.dataValues }
//             const token = generateToken(userInfo)
//             const data = { token: token, userInfo: userInfo }
//             return sendSuccessResponse(res, 200, data, 'Account verified successfully')
//         } else {
//             return sendErrorResponse(res, 500, 'Account verified fail')
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, error.message)
//     }
// }

// export { getUserFromToken, login, logout, register, verifyAccount }
