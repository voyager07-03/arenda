const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        type:'OAuth2',
        user:'rentvenuegomel@gmail.com',
        accessToken:'ya29.a0AfB_byBI0TNHnfKBT9TelGigEgTdhSo2oZs9JUkEoABW5caxiDysTokq2kjPVrqRXHoZDLUAVh3JtnaayfAzjlW8QEsDwvkQj1TpEp_zMzIDg-9Mhps6Tci0ERyCSP4LfidVH3EJYzSRcWDdCuNYdNHdHoV2tcLaeLk_M9e5aCgYKAeESARMSFQHsvYlsn58_7uvQLc7jwOHjYlhlJA0175',
        refreshToken:'1//04lvZrR5p3B4ZCgYIARAAGAQSNwF-L9IrH9dZoHMiW8ExlmU-oUdgDOwILMPXP8zeqjHoJEmWh-0nf5fea_Onbthj3oUKQenf0nY',
        clientId:'510672485378-bhrj62hmqglihpeirrd4n24caklh5sr6.apps.googleusercontent.com',
        clientSecret:'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',
        accessUrl:'https://oauth2.googleapis.com/token',

    }
},
{
    from:'Mailer Test <rentvenuegomel@gmail.com>',
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