"use strict";
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

module.exports = (option)=>{
    let url = option.url !== undefined ? option.url : 'mongodb://localhost:27017';
    let dbName = option.dbName !== undefined ? option.dbName : "jkzy";
    MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, client) {
        if(err){
            res.send("数据库链接失败");
        }
        let returnCollection = client.db(dbName).collection(option.collection);
        option.callback(returnCollection,client,ObjectId)
    });
};