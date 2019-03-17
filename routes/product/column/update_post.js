let router = require("express").Router();
let mongo = require("../../../common/mongo");
router.post("/",(req,res)=>{
	 let commonDate = {
        slides:req.session,
        crumb:"product",
        active:"column",
        columnName:"column",
        api_name:"product",
        id:req.body.id
    } 
    if(req.body.pic1===undefined){
    	mongo({ 
			collection:"column",
			callback:(collection,client,ObjectId)=>{
				 collection.updateOne({
				 	_id:ObjectId(req.body.id)
				 },{
				 	$set:{name:req.body.name}
				 },(err,result)=>{
				 	client.close();
				 	if(!err && result.result.n){
				 		res.send({msg:"修改成功",url:"/admin/product/column?dataName=column"});
				 		
				 	}else{
				 		res.send({msg:"修改失败",url:"/admin/product/column?dataName=column"});
				 		
				 	}
				 })
			}
		});
    }else{
    	res.send({msg:"修改失败",url:"/admin/product/column?dataName=column"});
    }
});
module.exports = router;