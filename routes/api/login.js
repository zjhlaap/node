let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	res.render("./home/login.html",{}); 
});
router.get("/loginIn",(req,res,next)=>{
	mongo({
		collection:"user",
		callback:(collection,client,ObjectId)=>{
			collection.find({tel:req.query.tel,password:req.query.pass}).toArray((err,result)=>{
				if(result.length==0){
					res.send({error:1,msg:"用户名或密码错误"})
				}else{
					// req.session.a=12;
					req.session.username = req.query.tel;
					res.send({error:0,msg:"登录成功",url:"/"})
					// console.log(req.sesion)
					// res.session.username = req.query.tel;
				}
			});
		}
	})
});
module.exports = router;