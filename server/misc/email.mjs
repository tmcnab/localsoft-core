import __dirname from '../__dirname'
import config from '../config'
import fs from 'fs'
import kramed from 'kramed'
import nodemailer from 'nodemailer'
import path from 'path'

export const generateEmailContent = (content, email) => {
    const file = path.join(__dirname, 'email-inlined.html')
    const htmlContent = fs.readFileSync(file).toString()

    // https://github.com/leemunroe/responsive-html-email-template
    // <!-- CONTENT HERE -->
    // <!-- ADDRESS HERE -->
    // <!-- UNSUBSCRIBE HERE -->
    let html = htmlContent.replace('<!-- CONTENT HERE -->', kramed(content))
    if (email) {
        html = html.replace('<!-- UNSUBSCRIBE HERE -->', `${config.SITE_URL}/unsubscribe?email=${email}`)
    }

    // TODO: also return a `text` member which is just plaintext
    return {html}
}

export const sendEmail = identifier => {
    // TODO: implement.
}

//
// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: account.user, // generated ethereal user
//             pass: account.pass // generated ethereal password
//         }
//     })
//
//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: 'bar@example.com, baz@example.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     }
//
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error)
//         }
//         console.log('Message sent: %s', info.messageId)
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
//
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     })
// })
