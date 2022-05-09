const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  app.get('/', async (req, res) => {
    const currentUser = req.user;
  
    Post.find({})
      .then((posts) => res.render('posts-index', { posts, currentUser }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      const post = new Post(req.body);

      post.save(() => res.redirect('/'));
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  //NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {})
  })

  // LOOK UP THE POST
  app.get('/posts/:id', (req, res) => {
    Post
      .findById(req.params.id).lean().populate('comments')
      .then((post) => res.render('posts-show', { post }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });

};