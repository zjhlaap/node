let routes = require("express").Router();
routes.get("/",(req,res)=>{
    let commonDate = {
        slides:req.session,
        crumb:"首页",
        active:"index"
    };
    res.render('home', commonDate);
})
module.exports = routes;