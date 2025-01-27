const express = require('express');
const router = express.Router();
const { Comments } = require('../../models');

router.get('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const comments = await Comments.findAll({
            where: { post_id: postId },
            attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        });

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comments.findByPk(req.params.id);
        console.log(commentData);
        const comment = commentData.get({ plain: true });
        res.render('comment', comment);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/:postId', async (req, res) => {
    console.log('COMMENTS')
    try {
        const { comment } = req.body;

        const createComment = await Comments.create({
            comment_text: comment,
            user_id: req.session.user_id,
            post_id: req.params.postId,
            where: {
                user_id: req.session.user_id
            }
        });

        res.status(201).json(createComment);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Could not create comment' });
    }
});

router.delete('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        await Comments.destroy({
            where: { id: commentId }
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Could not delete comment' });
    }
});

module.exports = router;