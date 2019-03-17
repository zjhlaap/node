let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
    let {q,start,count,rule}=req.query;
    count = count?count:3
    let commonData = {
        slides:req.session,
        crumb:"首页",
        active:"follow",
        columnName:"follow",
        'api_name':"product",
        start:start?start:1,
        q:q,
        count:count?count:3,
        rule:rule?rule:'time' 
    }
    mongo({
            collection:"follow",
            callback:(collection,client,ObjectId)=>{
                collection.countDocuments({},(err,result)=>{
                    commonData.pageCount=Math.ceil(result/(count-0));
                    collection.find(
                        q ? { title: eval('/' + q + '/g') } : {},
                        {
                        sort: rule ? { [rule]: -1 } : { 'time': -1 },
                        limit:count ? count-0: 3,
                        skip:start?(start-1)*count:0
                    }).toArray((err,result)=>{
                        client.close();
                        commonData.pageData = {data:result};
                        res.render("product/follow",commonData)
                    });
                })
            }
        });
})
// router.post("/add_post",)
module.exports = router;