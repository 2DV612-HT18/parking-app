const nodemailer = require("nodemailer");

// start of nodemailer test

const emailSender = {
    email : "",
    // create reusable transporter object using the default SMTP transport
    transporter : nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    }),


    // method to send mail with defined transport object
    sendEmail(email, link) {
        // setup email data with unicode symbols

        emailSender.transporter.sendMail(
            {from: '"Parker App" <parkwisely@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Welcome to Parker App', // plain text body
            html: `<b>Thank you for choosing Parker App</b><br><a href="${  link  }">Click HERE to verify your account!</a>`}, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        });
    }
}

export default emailSender;
