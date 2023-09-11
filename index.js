const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const adminRoutes = require('./routes/admin-route');
const appRoutes = require('./routes/app-route')
const session = require('express-session');
const mailer = require('./nodemailer');
const favicon = require('serve-favicon');
const path = require('path');






app.use(session({
  secret: 'FORDMUSTANG',
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/', appRoutes);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const faviconPath = path.join(__dirname, 'public', 'favicon', 'logo.ico');
app.use(favicon(faviconPath));

app.post('/send-mail', (req, res) =>{
  const message = {
      from: 'Mailer <rentvenuegomel@gmail.com>',
      to: 'rentvenuegomel@gmail.com',
      
      subject:'Новая заявка на аренду помещения',
      text:`Телефон клиента ${req.body.form__name}`

  }
  mailer(message);
  user = req.body;
  res.redirect('/');
})





async function startApp() {
  try {

    await mongoose.connect('mongodb+srv://user:user@cluster0.jugtwvv.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(port, () => console.log('SERVER STARTED'));
  
  } catch (e) {

    console.log(e);
    
  }
}

startApp();
