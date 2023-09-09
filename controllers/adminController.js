const Post = require('../PostModels/PostMdl'); 
const path = require('path');
const upload = require('../middleware/upload');
const fs = require('fs');
const bcrypt = require('bcrypt');


exports.addData= async (req, res) => {
  try {
    const newPost = req.body;
    const createdPost = await Post.create(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
require('dotenv').config();
exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPasswordFromEnv = process.env.DATABASE_PASSWORD;
    const hashedPassword = await bcrypt.hash(hashedPasswordFromEnv, 10); // Здесь генерируется хеш
    const posts = await Post.find({});
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (result) {
        req.session.isAuthenticated = true;
    
        res.render('admin',{posts});
      } else {
        res.redirect('/admin/login');
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  
  try {
    const deletedPost = await Post.findOneAndDelete({ buttonId: postId });
    
    if (deletedPost) {

  
      const mainImgPath = deletedPost.mainImg;
      const otherImgPaths = deletedPost.images;
      fs.unlinkSync(path.join(path.join(__dirname, '..'), mainImgPath));
      otherImgPaths.forEach(imgPath => {
          fs.unlinkSync(path.join(path.join(__dirname, '..'), imgPath));
      });

      res.status(200).json({ message: "Пост успешно удален" });
    } else {
      res.status(404).json({ message: "Пост не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Произошла ошибка при удалении поста" });
    console.log(error.message);
  }
};


exports.changeStatus = async (req, res) => {
  const postId = req.params.id;
  try {
      const post = await Post.findOne({ buttonId: postId });
      if (!post) {
          return res.status(404).json({ message: "Пост не найден" });
      }

      // Изменяем статус на противоположный
      post.status = !post.status;
      await post.save();

      res.status(200).json({ message: "Статус успешно изменен" });
  } catch (error) {
      res.status(500).json({ message: "Произошла ошибка при изменении статуса" });
  }
};


exports.editPost = async(req, res)=>{
  const postId = req.params.id;

    try {
        const post = await Post.findOne({ buttonId: postId });
        if (!post) {

            return res.status(404).json({ message: "Пост не найден" });
           
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Произошла ошибка при получении данных поста" });
       
    }
}

exports.addPost = async (req, res) => {
  const buttonId = req.body.buttonId;

  try {
    let post = await Post.findOne({ buttonId }); // Поиск поста по buttonId

    if (post) {
      const mainImgPath = post.mainImg;
      const otherImgPaths = post.images;
      fs.unlinkSync(path.join(path.join(__dirname, '..'), mainImgPath));
      otherImgPaths.forEach(imgPath => {
      fs.unlinkSync(path.join(path.join(__dirname, '..'), imgPath));
      });

      post.title = req.body.title;
      post.mainImg = req.files['mainImg'][0].path;
      post.images = req.files['otherImg'].map(file => file.path);
      post.address=req.body.address;
      post.smallDescription=req.body['small-description'];
      post.advantagesIcon = req.body.advantagesIcon;
      post.advantagesDescription = req.body.advantagesDescription,
      post.subtitle = req.body.subtitle;
      post.conveniences = req.body.conveniences.split(','),
      post.additionalInformation = req.body.additionalInformation;
      post.status = req.body.status;
      post.yardEntertainments =  req.body.yardEntertainments.split(',');
      post.entertainments = req.body.entertainments.split(',')
      post.cost = req.body.cost,
      post.square = req.body.square
      post.mapScript = req.body.mapScript

    } else {
      // Если пост не существует, создаем новый пост
      post = new Post({
        buttonId,
        title: req.body.title,
        mainImg: req.files['mainImg'][0].path,
        images: req.files['otherImg'].map(file => file.path),
        
        address:req.body.address,
        smallDescription:req.body['small-description'],
        advantagesIcon:req.body.advantagesIcon,
        advantagesDescription: req.body.advantagesDescription,
        subtitle:req.body.subtitle,
        additionalInformation: req.body.additionalInformation,
        status: req.body.status,
        conveniences: req.body.conveniences.split(','),
        yardEntertainments: req.body.yardEntertainments.split(','),
        entertainments: req.body.entertainments.split(','),
        cost:req.body.cost,
        square: req.body.square,
        mapScript: req.body.mapScript


      });
    }

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};


