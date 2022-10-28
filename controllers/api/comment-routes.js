const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET comment of user

router.get('/', async (req, res) => {
    try {
        const newComment = await Comment.findAll({ include: [User] });

        const comments = newComment.map(cmnt => cmnt.get({ plain: true }));
        //TODO: add path when view is done
        res.render('', {
            comments,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


//Create a comment

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;