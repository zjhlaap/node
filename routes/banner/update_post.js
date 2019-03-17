let router = require("express").Router();
let mongo = require("../../common/mongo");
router.post("/",(req,res)=>{
	 let commonDate = {
        slides:req.session,
        crumb:"banner",
        active:"banner",
        columnName:"banner",
        api_name:"banner",
    }
    if(req.body.pic1===undefined){
    	mongo({ 
			collection:"banner",
			callback:(collection,client,ObjectId)=>{
				 collection.updateOne({
				 	_id:ObjectId(req.body.id)
				 },{
				 	$set:{pic_address:req.ppp}
				 },(err,result)=>{
				 	client.close();
				 	if(!err && result.result.n){
				 		res.send({msg:"修改成功",url:"/admin/banner?dataName=banner"});
				 		
				 	}else{
				 		res.send({msg:"修改失败",url:"/admin/banner?dataName=banner"});
				 		
				 	}
				 })
			}
		});
    }else{
    	res.send({msg:"修改失败",url:"/admin/banner?dataName=banner"});
    }
});
module.exports = router;