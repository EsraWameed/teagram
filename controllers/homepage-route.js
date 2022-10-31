const router = require('express').Router();
const { Picture, User, Comment, Like } = require('../models');

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const PostData = await Picture.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username','image_profile'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = PostData.map((project) => project.get({ plain: true }));
        console.log(posts);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Picture.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['username', 'image_profile'] },
                {
                    model: Comment,
                    include: [User]
                },
                {
                    model: Like, 
                    include: [User]
                }
            ],
        });

        const posts = postData.get({ plain: true });
        
        const checkL = posts.likes.find(x => x.user_id === req.session.user_id);
        
        if(!checkL){
            posts.likedPost = true;
        }else{
            posts.likedPost = false;
        }

        console.log(posts);
        res.render('post-comment', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;