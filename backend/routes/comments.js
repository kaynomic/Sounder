const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { User, Song, Album, Comment } = require("../db/models");

// Edit a Comment
router.put('/:commentId', requireAuth, async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (comment) {
        if (comment.userId === user.id) {
            await comment.update({ body })

            res.json(comment);
        }

    } else {
        const err = new Error("Comment not found");
        err.status = 404;
        throw err;
    }
})


// Delete a Comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if (comment) {
        if (comment.userId === user.id) {
            comment.destroy();

            res.json({ msg: "Successfully deleted comment", statusCode: 200 })
        }
    } else {
        const err = new Error("Comment not found");
        err.status = 404;
        throw err;
    }
})

module.exports = router;
