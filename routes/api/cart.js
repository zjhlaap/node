let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	if(!req.session.username){
		res.send({error:1,url:"./login.html"});
	}else{
		mongo({
			collection:"cart",
			callback:(collection,client,ObjectId)=>{
				collection.find({}).toArray((err,result)=>{
					res.send({data:result});
				});
			}
		});
	}
});
router.get("/cart_list",(req,res)=>{
	
});
module.exports = router;