let router = require("express").Router();
let mongo = require("../../common/mongo");
router.post("/",(req,res)=>{
	 let commonDate = {
        slides:req.session,
        crumb:"product",
        active:"follow",
        columnName:"follow",
        api_name:"product",
    }
    if(req.body.pic1===undefined){
    	mongo({
			collection:"follow",
			callback:(collection,client,ObjectId)=>{
				 collection.updateOne({
				 	"_id":ObjectId(req.body.id)
				 },{
				 	$set:{
						"originalPrice":req.body.originalPrice,
		                "desc":req.body.desc,
		                "presentPrice":req.body.presentPrice,
		                "pic":req.ppp?req.ppp:req.body.old_pic,
		                "term_id":req.body.cid,
				 	}
				 },(err,result)=>{
				 	client.close()
				 	if(!err && result.result.n){
				 		res.send({msg:"修改成功",url:"/admin/product/follow?dataName=product"})
				 	}else{
				 		res.send({msg:"修改失败",url:"/admin/product/follow?dataName=product"})
				 	}
				 })
			}
		});
    }else{
    	res.send({msg:"修改失败",url:"/admin/product/follow?dataName=product"})
    }
})
module.exports = router;