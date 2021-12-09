// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.sendgridAPI);
// const nodemailer = require('nodemailer');

// let transport = nodemailer.createTransport({
//   host: 'in-v3.mailjet.com',
//   port: 587,
//   auth: {
//      user: '47178be0e423c822c55c573646d8a20f',
//      pass: 'a1c971665434f0f64c7b63c3794078ef'
//   }
// });
// const sendEmail = (code, toEmail) => {
//   const message = {
//     to: `${toEmail}`,
//     from: `${process.env.fromEmail}`,
//     subject: 'Verification Code',
//     text: `Your verification code is ${code}`,
//     html: `<h1>Your verification code is ${code} </h1>`,
// };
// transport.sendMail(message, function(err, info) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log("sent")
//       console.log(info);
//     }
// });
  // mail.message({
  //   to: `${toEmail}`,
  //   from: `${process.env.fromEmail}`,
  //   subject: 'Verification Code',
  //   text: `Your verification code is ${code}`,
  //   html: `<h1>Your verification code is ${code} </h1>`,
  // })
  // .body('Node speaks SMTP!')
  // .send(function(err) {
  //   if (err) throw err;
  //   console.log('Sent!');
  // });
  //   const msg = {
  //       to: `${toEmail}`,
  //       from: `${process.env.fromEmail}`,
  //       subject: 'Verification Code',
  //       text: `Your verification code is ${code}`,
  //       html: `<h1>Your verification code is ${code} </h1>`,
  //     };

  //   sgMail
  // .send(msg)
  // .then(() => {}, error => {
  //   console.error(error);
 
  //   if (error.response) {
  //     console.error(error.response.body)
  //   }
  // });
// }




const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
const sendEmail = (code, toEmail) => {
  console.log("hello")
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": `${process.env.fromEmail}`,
                "Name": "Collegebazar team"
            },
            "To": [{
                "Email": `${toEmail}`,
            }],
            "Subject": "Verification Code",
            "TextPart": `Your verification code is ${code}`,
            "HTMLPart": `<h1>Your verification code is ${code} </h1>`
        }]
    })
request
    .then((result) => {
        console.log("mail sent")
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
  }
module.exports = sendEmail;