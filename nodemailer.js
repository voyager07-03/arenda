const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    { 
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {

            type:'OAuth2',
            user: 'rentvenuegomel@gmail.com',
            accessToken: 'ya29.a0AfB_byBfwc-NtVjgHFA3Q7cvOOKgleTUIm9sbxDQLD_7JY16DQABilXn6HYjyHTTIgvfy9v_y4Dym5GAhAd7JPEVcDzaCtuc4zmJN5JZ_7sFpKJ0Qs22U1MVJT007IfXgh9lfnXTcW_-ezdjX66dyIsGJNiI2BWCSz0CTlXRaCgYKAaESARMSFQHsvYlszByiMC45PCYTk6iVkG7hnQ0175',
            refreshToken:'1//04ADkqyp7aOqBCgYIARAAGAQSNwF-L9IrSQUNB21-3xwzXUNUv8NW6fJVOQXRzEuDHY2efJtQ7p8laxwEONRcoTzSwRIRAMwWCm4',
            clientId:'773439170242-t4dj5uaprdp66ro2jnpfdcdq6i1v957i.apps.googleusercontent.com',
            clientSecret:'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',
            accessToken:'https://oauth2.googleapis.com/token',
        }
    }
)

const mailer =  message => {
    transporter.sendMail(message, (err, info) => {
        if(err){
            console.log(err);
        }
        
        console.log('Успешно отправлено');
    })
}

module.exports = mailer;