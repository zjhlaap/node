let routes = require("express").Router();
routes.get("/",(req,res)=>{
    delete res.session.username;
    res.redirect("/login")
})
module.exports = routes;