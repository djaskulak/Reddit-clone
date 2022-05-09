const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/:subreddit', async (req, res) => {
  try {
    const posts = await Post.find({subreddit: req.params.subreddit}).lean();
    return res.render('posts-index', {posts})
  } catch (err) {
    console.error(err)
  }
});

module.exports = router