import nodemailer from 'nodemailer'

export const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: false, // Use SSL
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
    })
   
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
    }

    try {
        // Gửi email
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
}
