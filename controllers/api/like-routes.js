const router = require('express').Router();
const { Like, User } = require('../../models');
const withAuth = require('../../utils/auth');
// router.get('/', async (req, res) => {
//     try {
//         const newLike = await Like.findAll({ include: [User], });

//         const likes = newLike.map(cmnt => cmnt.get({ plain: true }));
//         //TODO: add path when view is done
//         // res.status(200).json(newLike)
//         console.log(likes);
//         res.render('post-comment', {
//             likes,
//             loggedIn: req.session.loggedIn,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


//Create a comment

router.post('/',withAuth, async (req, res) => {
    try {
        const newLike = await Like.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newLike);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;