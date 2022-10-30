const router = require('express').Router();
const { Picture, User } = require('../models/');
const Path = require("path");
const { promises: Fs } = require('fs')
const withAuth = require('../utils/auth')
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
router.post("/",withAuth,  async (req, res) => {
    //start writing the upload functionality
    //creare a variable name that will hold the file
    //keep consistent with form and call it sampleFile
    let sampleFile;
    let uploadPath;
    //if object is empty send a message to alert
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No pictures uploaded")
    }
    //if not empty, grab the file
    //name of the input is sampleFile. __dirname is main directory name
    sampleFile = req.files.sampleFile;

    //add code to remove. timestap function --> current# as uploadname
    uploadPath = __dirname + "/resource/upload/" + sampleFile.name;
    //console log to see what object looks like
    console.log(sampleFile.name);
    const userData = await Picture.create({
        image_post: `/upload/${sampleFile.name}`,
        user_id: req.session.user_id,
        caption: req.body.caption,
    });
    //use mv() to place file on server. grab sampleFile object and pass the path
    // console.log(userData);
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        // if file is rendered, display a message
        router.put("/", async (req, res) => {
            
            try {
                
                userData.map((project) => project.get({ plain: true }));
                // document.location.reload()
            }
            catch (err) {
                res.status(500).json(err)
            }

        });
    });


    // res.send("File Uploaded");
    res.redirect('/dashboard');

});
//////

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