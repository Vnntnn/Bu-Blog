const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({
            title,
            content,
            author: req.user.id  // ได้จาก token middleware
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create post' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

exports.getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching post' });
    }
};
