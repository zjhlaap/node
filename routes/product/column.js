let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	let {q,start,count,rule}=req.query;
    count = count?count:3
    let commonData = {
        slides:req.session,
        crumb:"首页",
        active:"column",
        columnName:"column",
        'api_name':"product",
        start:start?start:1,
        q:q,
        count:count?count:30,
        rule:rule?rule:'time' 
    }
    mongo({
    	collection:"column",
    	callback:(collectionss,client,ObjectId)=>{
    		collectionss.countDocuments({},(err,result)=>{
                commonData.pageCount=Math.ceil(result/(count-0));
                collectionss.find({},{sort:{"time":-1}}).toArray((err,result)=>{
                    commonData.pageData = {data:result};
                    client.close();
                    res.render("product/column",commonData)
                });
            })
    	}
    })
});
router.get("/add",(req,res)=>{ 
	let {q,start,count,rule}=req.query;
    count = count?count:3
    let commonData = {
        slides:req.session,
        crumb:"首页",
        active:"column",
        columnName:"column",
        'api_name':"product",
        start:start?start:1,
        q:q,
        count:count?count:3,
        rule:rule?rule:'time' 
    }
	res.render("product/column/add",commonData);
});
router.use("/add_post",require("./column/add_post"));
router.use("/del",require("./column/del"));
router.use("/update",require("./column/update"));
router.use("/update_post",require("./column/update_post"));
module.exports = router; 