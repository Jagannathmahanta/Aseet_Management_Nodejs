import express from "express"
import mysqlConnection from "../config/config"
const router =express.Router()

router.get("/get-users",(res,resp)=>{
   const query= "SELECT users.name,users.email,location.name FROM location left join users on users.location=location.location"
   mysqlConnection.query(query,(err,results)=>{
    if (err) throw err
    resp.send(results)
   })
})

export default router;
