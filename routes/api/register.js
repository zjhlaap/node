let routes = require("express").Router();
let mongo = require("../../common/mongo");
routes.get("/",(req,res)=>{
	res.render("home/register.html",{});
});
routes.get("/reg",(req,res)=>{
	mongo({
		collection:"user",
		callback:(collection,client,ObjectId)=>{
			collection.insertOne({
				tel:req.query.tel,
				password:req.query.pass
			},(err,result)=>{
				if(!err){
					res.send({error:0,data:result});
				}
			})
		}
	});
});
module.exports = routes;