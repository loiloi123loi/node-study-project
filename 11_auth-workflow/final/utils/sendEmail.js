const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
    // const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport(nodemailerConfig);
    return transporter.sendMail({
        from: 'loivantran10012002@gmail.com',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
