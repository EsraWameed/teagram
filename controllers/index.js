const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homepage-route');
const dashboardRoutes = require('./dashboard-routes');
const userProfileRoutes = require('./user-profile-routes');


router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/userimage', userProfileRoutes);

router.use('/', homeRoutes);


module.exports = router;