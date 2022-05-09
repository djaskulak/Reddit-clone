const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });

  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req.body)
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  });

  //NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {})
  })

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });

};