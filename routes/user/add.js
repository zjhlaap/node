let route = require("express").Router();
route.get("/",(req,res)=>{
    res.render("user_add",{});
});
module.exports = route;