let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
	rule = req.query.rule ? req.query.rule : 'time';
	count = req.query.count ? req.query.count : 3;
	q = req.query.q ? req.query.q : '';
	start = req.query.start ? req.query.start:1;
	let commonData = {
        slides:req.session,
        crumb:"首页",
        active:"slideNav",
        columnName:"slideNav",
        'api_name':"slideNav",
        q,
        time:req.query.time,
        start,
        rule,
        count
    }
    mongo({
    	collection:"slide",
    	callback:(collection,client,ObjectId)=>{
    		collection.find({}).toArray((err,result)=>{
                client.close();
    			commonData.pageDate = {data:result};
                res.render("slidenav",commonData);
    		});
    	}
    });
	
});

routes.use("/add",require("./slidenav/add"));

module.exports = routes;