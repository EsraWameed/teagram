const router = require('express').Router();

const userRoutes = require ('./user-routes');
const postRoutes = require ('./picture-routes');
const commentRoutes = require ('./comment-routes');
const likeRoutes = require('./like-routes');

router.use('/users', userRoutes);
router.use('/pictures', postRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
module.exports = router;