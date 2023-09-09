const Post = require('../PostModels/PostMdl'); 
const mailer = require('../nodemailer');


exports.rendApp= async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('index',{posts});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.rendPost = async(req, res)=>{

  function getAltText(index, post) {
    if (index < 2) {
        return `${post.title} - Удобства ${index + 1}`;
    } else {
        return `${post.title} - Развлечения во дворе ${index - 1}`;
    }

}
  try {

    const postId = req.params.postId;


    const post = await Post.findById(postId);
    res.render('post.ejs', { post, getAltText});
  } catch (error) {

    console.error(error);
    res.status(404).send('Пост не найден');
  }
}


exports.sendMail = (req, res)=>{
  console.log(req.body);
  const message = {
      to: 'rentvenuegomel@gmail.com',
      subject: 'Новая заявка на аренду помещения',
      text:`Телефон клиента ${req.body.phone}` + ` Имя клиента ${req.body.name}`+ ` Потенциальная дата аренды ${req.body.date}`,
  }
  mailer(message);
  res.redirect('/')
}