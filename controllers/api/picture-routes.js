const fs = require("fs");
const router = require('express').Router();
const { Picture } = require('../../models');
const upload = require("../../utils/multer");


//Creating a get route to display all image data
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const pictureData = await Picture.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Pass serialized data and session flag into template
        res.status(200).json(pictureData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//creating a post route to add images
router.post("/", upload.single("file"), async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }
//reading image uploaded
        Image.create({
            caption: req.body.caption,
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/public/assets/images/" + req.file.filename
            ),
//adding image into folder path
        }).then((image) => {
            fs.writeFileSync(
                __basedir + "/public/assets/images/" + image.name,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
});


//delete picture route
router.delete('/:id', async (req, res) => {
    try {
        const pictureData = await Image.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!pictureData) {
            res.status(404).json({ message: 'No picture found with this id!' });
            return;
        }

        res.status(200).json(pictureData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

