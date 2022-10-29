const router = require('express').Router();
const { User, Picture } = require('../models');

// router.get("/", async (req, res) => {
//     try {
//         const userData = await User.findAll({
//             where:{"id": req.session.user_id},
//         });

//         const users = userData.map((project) => project.get({ plain: true }));
//         console.log(users);

//         res.render("profileimg", {
//             layout: 'dashboard',
//             users,
//             loggedIn: req.session.loggedIn,
//         });
//     } catch (err) {
//         res.status(500).json(err)
//     }

// });

router.get('/profileimg', async (req, res) => {
    try{
        const userData = await User.findAll({
            where:{"id": req.session.user_id},
        });

        const userImg = userData.map(d => d.get({plain:true}));
        
        // res.status(200).json(userImg);
        res.render('profileimg', {
            layout: 'dashboard',
            userImg,
            loggedIn: req.session.loggedIn,
        });
        console.log(userImg);
    }catch(err){
        res.status(500).json(err);
    }
});

////////////
router.post("/", async (req, res) => {
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
    const userData = await User.update({ image_profile: `/upload/${sampleFile.name}` }, {
        where: { "id": req.session.user_id }
    });
    //use mv() to place file on server. grab sampleFile object and pass the path

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);


        //if file is rendered, display a message
        router.put("/", async (req, res) => {
            try {
                userData.map((project) => project.get({ plain: true }));
                // document.location.reload()
            }
            catch (err) {
                res.status(500).json(err)
            }

        });
    })


    res.redirect('/userimage/profileimg');

});

////////////

// router.get('/profileimg', (req, res) => {
//     res.render('profileimg', {
//         layout: 'dashboard'
//     });
// });

module.exports = router;
