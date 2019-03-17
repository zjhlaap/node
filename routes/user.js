let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
	rule = req.query.rule ? req.query.rule : 'time';
	count = req.query.count ? req.query.count : 3;
	q = req.query.q ? req.query.q : '';
	start = req.query.start ? req.query.start:1;
	 let commonDate = {
        slides:req.session,
        crumb:"首页",
        active:"user",
        columnName:"user",
        'api_name':"user",
        q,
        time:req.query.time,
        start,
        rule,
        count
    }
    mongo({
    	collection:"user",
    	callback:(collection,client,)=>{
    		collection.countDocuments({},(err,result)=>{
                commonDate.pageCount=Math.ceil(result/(count-0)) ? Math.ceil(result/(count-0)) : 1;
                collection.find(
                    q ? { title: eval('/' + q + '/g') } : {},
                    {
                    sort: rule ? { [rule]: -1 } : { 'time': -1 },
                    limit:count ? count-0: 3,
                    skip:start?(start-1)*count:0
                }).toArray((err,result)=>{
                    client.close();
                    commonDate.pageData = {data:result};
                    res.render("user",commonDate);
                });
            })
    	}
    });
    
});
module.exports = routes;