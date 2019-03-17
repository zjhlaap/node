let routes = require("express").Router();
routes.get("/",(req,res)=>{
    res.render("error",{msg:req.query.msg,url:req.query.url})
});
module.exports = routes;