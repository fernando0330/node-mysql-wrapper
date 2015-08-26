﻿/* 19-08-2015: telika auto to project 9a einai akrivws to idio sintaktika kai me tis klaseis tou node-mysql-wrapper apla se typescript
otan teleiwsw auto to project tote 9a kanw kai mia library gia tous typescript developersk ai gia ta alla melontika mou project
to opoio 9a legete mysql-db, kai 9a doulevei me annotation, opws eixa kanei se C# kai se Java tis proigoumenes vivliothikes.

  to skeptiko gia na trexei 9a einai

import db = require("node-mysql-wrapper")("to connection url");

class User{
 userId:number;
 username:string;

 @Relation("senderId",Message,true) // foreign key,class type, is list?
 sentMessages: Array<Message>;  // i xwris to : Array<Comment>, auto 9a tous voi9aei mono sto code -completion gt dn borw na parw to classtype apo ekei etsi k aliws ( ws twra tlxstn)

 @Relation("receiverId",Message,true);
 receivedMessages: Array<Message>;

}

class Message{

 commentId:number;
 content:string;
 senderId:number;
 receiverId:number;

 @Relation("userId",User);
 sender:User;

 @Relation("userId",User);
 receiver:User;

}


Table<User> userTable = db.tables["users"];

userTable.findAll(results,()=>{ //or promise
    var users = results;
}); //or an vrw tin fasi me ta await: users:Array<User> = await userTable.findAll();

User userToFind = new User();
userToFind.userId = 18;
userTable.find(userToFind,()=>{  //or promise
  //kai edw ti? oti to userToFind object einai etoimo me ola ta properties? ti ston poutso na valei o developer edw mesa...
  //prepei na psaksw ta await gia na to kanw: await userTable.find(userToFind); console.log(userToFind.username);
  //or: user userToFind = await userTable.find({userId:18});
});
*/

/*
already supported:

Destructuring

  var topic = {name:'ECMAScript 6',
    comment: 'Next version of JavaScript',
    browserStatus: {
        chrome: 'partial',
        opera:'partial',
        ie: 'very less',
        ieTechPreview: 'partial'
    }};

var {name, browserStatus:{opera}} = topic;  //name: 'ECMAScript 6', opera: 'partial

*/


import MysqlConnection from "./lib/MysqlConnection";
import MysqlWrapper from "./lib/MysqlWrapper";
import * as Mysql from "mysql";

if (Function.prototype["name"] === undefined) {
    //works only for function something() {}; no for var something = function(){}
    // Add a custom property to all function values
    // that actually invokes a method to get the value
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            return /function ([^(]*)/.exec(this + "")[1];
        }
    });
}

export  function wrap(mysqlUrlOrObjectOrMysqlAlreadyConnection: Mysql.IConnection |  string, ...useTables: any[]): MysqlWrapper {
    let mysqlCon = new MysqlConnection(mysqlUrlOrObjectOrMysqlAlreadyConnection);
    let mysqlWrapper = new MysqlWrapper(mysqlCon);

    if (useTables) {
        mysqlWrapper.useOnly(useTables);
    }

    return mysqlWrapper;
}
