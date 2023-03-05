const express = require("express")
const cors=require("cors");
const mysqlConnection = require("./config/config")
const bodyParser = require('body-parser');
const { query } = require("express");
const app = express()
app.use(express.json())
app.use(bodyParser.json());


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions)) 
//Get User

app.get("/get-users",(req,res)=>{
    const query= "SELECT users.name,users.email,location.name FROM location left join users on users.location=location.location"
   mysqlConnection.query(query,(err,resuslt)=>{
    if(err){
        res.send(err)
    }else{
        res.send({resuslt})
    }
   })
    
})
//Get User by Id
app.get("/get-user/:id",(req,res)=>{
    
    mysqlConnection.query("select * from users where id= ?",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
    })
})

//Get asset
app.get("/get-assets",(req,res)=>{
    const query="select assets.id,asset_models.model_name, asset_types.asset_type, asset_ownerships.asset_owner, vendors.vendor_name, assets.serial_number,assets.asset_received_date, assets.asset_returned_date, assets.configuration,location_details.location, assets.device_name from assets join   asset_models on assets.asset_model_name = asset_models.id  JOIN asset_trackings on assets.id = asset_trackings.asset_id JOIN users on asset_trackings.user_id = users.id JOIN asset_types on assets.asset_type = asset_types.id JOIN asset_ownerships on assets.asset_owner = asset_ownerships.id LEFT JOIN vendors on assets.vendor = vendors.id JOIN location_details on assets.location = location_details.id Where assets.asset_returned_date is null;"
    mysqlConnection.query(query,(err,Data)=>{
        if(err){
            res.send(err)
        }else{
            res.send({Data})
        }
       })
})

//Get User role
app.get("/get-role",(req,res)=>{
    
    mysqlConnection.query("select * from roles",(err,resuslt)=>{
        if(err){
            res.send(err)
        }else{
            res.send(resuslt)
        }
       })
})

//Get location
app.get("/get-location",(req,res)=>{
    
    mysqlConnection.query("select * from location_details",(err,resuslt)=>{
        if(err){
            res.send(err)
        }else{
            res.send(resuslt)
        }
       })
})

//Get Model
app.get("/get-model",(req,res)=>{
    
    mysqlConnection.query("select * from asset_models",(err,resuslt)=>{
        if(err){
            res.send(err)
        }else{
            res.send(resuslt)
        }
       })
})

//Get Owner
app.get("/get-owner",(req,res)=>{
    
    mysqlConnection.query("select * from asset_ownerships",(err,resuslt)=>{
        if(err){
            res.send(err)
        }else{
            res.send(resuslt)
        }
       })
})

// Get Vendor
app.get("/get-vendor",(req,res)=>{
    
    mysqlConnection.query("select * from vendors",(err,resuslt)=>{
        if(err){
            res.send(err)
        }else{
            res.send(resuslt)
        }
       })
})

app.put("/update-user/:id",(req,res)=>{
    const data = [req.body.mobileNumber,req.params.id]
    mysqlConnection.query("UPDATE users SET mobile_number = ?  WHERE id = ?" ,data,(err,result,fields)=>{
        if (err) throw err;
        res.send(result)
    } )
})


app.post("/create-user",(req,res)=>{
    const data =req.body
    mysqlConnection.query("INSERT INTO users SET ?",data,(err,result,fields)=>{
        if (err) throw err;
        res.send(result)
    } )
})

app.post("/create-asset",(req,res)=>{
    const data =req.body
    mysqlConnection.query("INSERT INTO assets SET ?",data,(err,result,fields)=>{
        if (err) throw err;
        res.send(result)
    } )
})

// Add a new user  
// app.post('/user', function (req, res) {
//     let user = req.body.user;
//     if (!user) {
//     return res.status(400).send({ error:true, message: 'Please provide user' });
//     }
//     dbConn.query("INSERT INTO user SET ? ", { user: user }, function (error, results, fields) {
//     if (error) throw error;
//     return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
//     });

app.delete("/delete-user/:id",(req,res)=>{
    
    mysqlConnection.query("DELETE FROM users WHERE id= ?",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        res.send("user deleted successfully")
    })
})

app.listen(9000)