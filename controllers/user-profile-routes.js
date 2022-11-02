const router = require('express').Router();
const { User, Picture } = require('../models');
const withAuth = require('../utils/auth');
const upload = require('../utils/multer');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

const fs = require('fs');


router.get('/profileimg', async (req, res) => {
    try {
        const userData = await User.findAll({
            where: { "id": req.session.user_id },
        });

        const userImg = userData.map(d => d.get({ plain: true }));

       
        res.render('profileimg', {
            layout: 'dashboard',
            userImg,
            loggedIn: req.session.loggedIn,
        });
        console.log(userImg);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/',withAuth, upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    try{
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;

            const newPath = await uploader(path);

            urls.push(newPath);

            fs.unlinkSync(path);

        }
        console.log(urls[0].url);
        const userData = await User.update({ image_profile: urls[0].url }, {
            where: { "id": req.session.user_id }
        });

        router.put("/", async (req, res) => {
            try {
                userData.map((project) => project.get({ plain: true }));

            }
            catch (err) {
                res.status(500).json(err)
            }

        });
       
        res.redirect('/userimage/profileimg');

    } catch(err) {
        res.status(405).json(err);
    }
    
})

module.exports = router;
