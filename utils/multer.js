const multer = require('multer');
// const fol = require('../controllers/uploads');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './uploads/');
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + '-'+ file.originalname);
    }
});


const fileFilter = (req,file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp'){
        cb(null, true);
    }else{
        cb({message: 'Unsupported file formate'}, false);
    }
}


const upload = multer({
    storage: storage,
    // limits:{fileSize:1024*1024},
    fileFilter: fileFilter
})


module.exports = upload;