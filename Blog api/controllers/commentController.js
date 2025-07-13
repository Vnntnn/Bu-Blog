const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    try {
        const comment = new Comment({
            content,
            post: postId,
            author: req.user.id
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create comment' });
    }
};

exports.getCommentsByPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('author', 'username')
            .populate('post', 'title') // เผื่ออยากรู้ว่าคอมเมนต์อยู่โพสต์ไหน
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all comments' });
    }
};
