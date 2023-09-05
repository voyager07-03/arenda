const Post = require('../PostModels/PostMdl'); 

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

    // Передаем найденный пост в шаблон post.ejs для отрисовки
    res.render('post.ejs', { post, getAltText});
  } catch (error) {
    // Обработка ошибок, например, если пост не найден
    console.error(error);
    res.status(404).send('Пост не найден');
  }
}
