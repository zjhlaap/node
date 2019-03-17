let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
    res.render("reg",{});
});
routes.post("/submit",(req,res)=>{
    let {username,password} = req.body;
    if(username==''||password=='' || username == undefined || password == undefined){
        res.redirect("/admin/error?msg=注册失败，用户名或密码不得为空&url=/admin/register")
    }
    if(!isNaN(Number(password)) || /^\s$/.test(password)){
        res.redirect("/admin/error?msg=注册失败，密码不得为纯数字或空格&url=/admin/register")
    }
    mongo({
        collection:"super",
        callback:(collection,client,ObjectId)=>{
            collection.find({
                username
            }).toArray((err,result)=>{
                if(result.length>0){
                    client.close();
                    res.redirect("/admin/error?msg=注册失败,该用户名已存在&url=/admin/register")
                }else{
                     collection.insertOne({
                        "username": username,
                        "password":password,
                        "icon":"/admin/img/project-1.jpg",
                        "time":Date.now()
                    },(err,result)=>{
                        client.close();
                        if(!err && result.result.n>0){
                            res.redirect("/admin/login");
                        }else{
                            res.redirect("/admin/error?msg=注册失败，请稍后重试&url=/admin/register")
                        }
                    });
                }
            })
        }
    });
   
})
module.exports = routes;