let routes = require("express").Router();

routes.get("/",(req,res)=>{
	res.render("./home/index.html",{});
})

module.exports = routes;