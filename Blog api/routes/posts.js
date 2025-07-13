const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPost);
router.get('/', getAllPosts);
router.get('/:id', getSinglePost);

module.exports = router;
