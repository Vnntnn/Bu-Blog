const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost } = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

// ต้องล็อกอินถึงคอมเมนต์ได้
router.post('/posts/:id/comments', auth, createComment);

// ทุกคนอ่านคอมเมนต์ได้
router.get('/posts/:id/comments', getCommentsByPost);

// เอาทุกคอมเม้นมาในทีเดียว
router.get('/comments', getAllComments);

module.exports = router;
