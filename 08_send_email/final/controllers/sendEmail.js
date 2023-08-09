const nodemailer = require('nodemailer');

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    // console.log(testAccount);

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"Coding Addict" <sssum812@gmail.com>',
        to: 'loivantran10012002@gmail.com',
        subject: 'Anh Loi Test Auto Verify Email',
        text: 'Xin chào bạn, hiện tại email này của bạn đang sử dụng cho tài khoản trên web CTY TNHH LOILOI123LOI',
        html: '<h2>Sending Emails with Node.js</h2>',
    });

    res.json(info);
};

const sendEmail = async (req, res) => {
    res.json({ msg: 'OKE' });
};

module.exports = {
    sendEmailEthereal,
    sendEmail,
};
