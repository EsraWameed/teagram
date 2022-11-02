const router = require('express').Router();
const { Picture, User } = require('../models/');
const Path = require("path");
const { promises: Fs } = require('fs')
const withAuth = require('../utils/auth');
const upload = require('../utils/multer');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
//
const fs = require('fs');
// router.get('/', async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const PostData = await Picture.findAll({
//             where: { "user_id": req.session.user_id },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             ],
//         });

//         // Serialize data so the template can read it
//         const posts = PostData.map((project) => project.get({ plain: true }));

//         // Pass serialized data and session flag into template
//         res.render('post', {
//             layout: 'dashboard',
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//////
router.get('/', async (req, res) => {
    try {
        const pictureData = await Picture.findAll({
            where: { "user_id": req.session.user_id },
            include: [
                {
                    model: User,
                    attributes: ['username', 'image_profile', 'first_name', 'last_name'],
                },
            ],
        });

        const posts = pictureData.map((project) => project.get({ plain: true }));
        console.log(posts)
        res.render("post", {
            layout: 'dashboard',
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }


});
////////

//////////
// router.post("/",withAuth,  async (req, res) => {

//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send("No pictures uploaded")
//     }

//     sampleFile = req.files.sampleFile;


//     uploadPath = __dirname + "/resource/upload/" + sampleFile.name;

//     console.log(sampleFile.name);
//     const userData = await Picture.create({
//         image_post: `/upload/${sampleFile.name}`,
//         user_id: req.session.user_id,
//         caption: req.body.caption,
//     });

//     sampleFile.mv(uploadPath, function (err) {
//         if (err) return res.status(500).send(err);


//         router.put("/", async (req, res) => {

//             try {

//                 userData.map((project) => project.get({ plain: true }));

//             }
//             catch (err) {
//                 res.status(500).json(err)
//             }

//         });
//     });



//     res.redirect('/dashboard');

// });
//////
///////
router.post('/',withAuth, upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    try {
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;

            const newPath = await uploader(path);

            urls.push(newPath);

            fs.unlinkSync(path);

        }
        console.log(urls[0].url);

        const userData = await Picture.create({
            image_post: urls[0].url,
            user_id: req.session.user_id,
            caption: req.body.caption,
        });

        router.put("/", async (req, res) => {
            try {
                userData.map((project) => project.get({ plain: true }));

            }
            catch (err) {
                res.status(500).json(err)
            }

        });
        // res.status(200).json({
        //     data: urls
        // });
        res.redirect('/dashboard');

    } catch (err) {
        res.status(405).json(err);
    }
    
})
////////
router.get('/editPost/:id', async (req, res) => {
    try {
        const postData = await Picture.findByPk(req.params.id);

        const posts = postData.get({ plain: true });

        res.render('edit-post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newPost', (req, res) => {
    res.render('newPost', {
        layout: 'dashboard'
    });
});
module.exports = router;