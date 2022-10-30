const router = require('express').Router();
const { Picture, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const PostData = await Picture.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'image_profile'],
                },
            ],
        });

        // Pass serialized data and session flag into template
        res.status(200).json(PostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a post
// router.post('/',  async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


//update  a post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Picture.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a picture
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Picture.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;