let router = require("express").Router();
let mongo = require("../../common/mongo");
router.post("/",(req,res)=>{
    mongo({
        collection:req.body.columnName,
        callback:(collection,client,ObjectID)=>{
            collection.insertOne({
                "originalPrice":req.body.originalPrice,
                "desc":req.body.desc,
                "presentPrice":req.body.presentPrice,
                "pic":req.ppp,
                "term_id":req.body.cid,
                time:Date.now()
            },(err,result)=>{
                if(!err && result.result.n>0){
                    client.close()
                    res.send({error:0,msg:"插入成功",url:"/admin/product/follow?columnName=follow&q="+req.body.q+"&rule="+req.body.rule+"&count="+req.body.count+"&start="+req.body.start})
                }else{
                    res.send({error:1,msg:"插入失败"})
                }
            });
        }
    });

});
module.exports = router;