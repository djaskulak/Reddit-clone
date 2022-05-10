const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  // INDEX
  app.get('/', async (req, res) => {
    const currentUser = req.user;
  
    Post.find({}).lean().populate('author')
      .then((posts) => res.render('posts-index', { posts, currentUser }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const post = new Post(req.body);
      post.author = userId;

      post
        .save()
        .then(() => User.findById(userId))
        .then((user) => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          return res.redirect(`/posts/${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  //NEW
  app.get('/posts/new', async (req, res) => {
    res.render('posts-new', {})
  })

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;
    Post.findById(req.params.id).populate('comments').lean()
      .then((post) => res.render('posts-show', { post, currentUser }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const { user } = req;
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts, user }))
      .catch((err) => {
        console.log(err);
      });
  });

};