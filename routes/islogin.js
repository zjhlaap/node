let path = require("path");
let fs = require("fs");
module.exports = (req,res,next)=>{

    if(req.session.username){
        if(req.files){
            if(req.files.length){
                let upload_file_name = req.files[0].filename;
                let upload_file_name_ext = upload_file_name + path.parse(req.files[0].originalname).ext;
                fs.renameSync(req.pp+upload_file_name,req.pp+upload_file_name_ext);
                req.pp = req.pp+upload_file_name_ext;
                req.ppp = req.ppp + upload_file_name_ext;
            }
            
        }

        next();
    }else{
        res.redirect("/admin/login")
    }

}