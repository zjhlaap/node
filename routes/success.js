let routes = require("express").Router();

routes.get("/",(req,res)=>{
	
	res.render("success",{msg:req.query.msg,url:req.query.url})
});
module.exports = routes;