let router = require("express").Router();
let mongo = require("../../common/mongo")
router.get("/",(req,res)=>{
	if(!req.session.username){
		res.send({error:1,url:"./login.html"});
	}else{
		mongo({
			collection:"follow",
			callback:(collection,client,ObjectId)=>{
				collection.find({_id:ObjectId(req.query.id)}).toArray((err,result)=>{
					var result1 = result;
					mongo({
						collection:"cart",
						callback:(collection,client,ObjectId)=>{
							collection.find({pid:req.query.id}).toArray((err,result)=>{
								if(result.length>0){
									collection.updateOne({pid:req.query.id},{$set:{count:result[0].count-0+1}},(err,result)=>{
										res.send({error:0,msg:'添加成功'});
									})
								}else{
									collection.insertOne({
										pid:req.query.id,
										desc:result1[0].desc,
										presentPrice:result1[0].presentPrice,
										pic:result1[0].pic,
										term_id:result1[0].term_id,
										count:1,
										user:req.session.username
									},(err,result)=>{
										if(!err){
											res.send({error:0,msg:'添加成功'});
										}else{
											res.send({error:1,msg:'添加失败'});
										}
									})
								}
							})
						}
					})
				})
			}
		})
	}
	
});
module.exports = router;