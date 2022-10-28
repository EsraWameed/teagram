const router = require('express').Router();

const userRoutes = require ('./user-routes');
const postRoutes = require ('./picture-routes');
const commentRoutes = require ('./comment-routes');

router.use('/users', userRoutes);
router.use('/pictures', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;