let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
    res.render("login",{});
});
routes.post("/submit",(req,res)=>{
    if(req.body.username==''||req.body.password == ''){
        res.redirect("/admin/error?msg=用户名或密码不得为空&url=/admin/login");
    }
    mongo({
        collection:"super",
        callback:(collection,client)=>{
            collection.find({
                "username":req.body.username,
                "password":req.body.password
            }).toArray((err,result)=>{
                client.close();
                if(!err&&result.length>0){
                    req.session.username = result[0].username;
                    req.session.icon = result[0].icon;
                    res.redirect("/admin");
                }else{
                    res.redirect("/admin/error?msg=登陆失败，用户名或密码错误&url=/admin/login");
                }
            });
        }
    })
})
module.exports = routes;