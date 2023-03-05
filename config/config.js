const mysql = require('mysql');
const fs = require('fs')
//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaga@1991',
      database: 'asset_management_system',
    //database: 'crud',
    
    });
//     mysqlConnection.connect((err)=> {
//         if(!err)
//         console.log('Connection Established Successfully');
//         else
//         console.log('Connection Failed!'+ err);
//         });
//   mysqlConnection.query("select * from user",(err,result)=>{
//     console.log(result)
//   })
 
module.exports=mysqlConnection;