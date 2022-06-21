import express  from "express";
import bcrypt from 'bcrypt';
import  pool  from "../db/database.mjs";
// import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import jwtTokens from '../function_token/jwtTokens.mjs'

dotenv.config()

const router=express.Router();





router.post("/login",async(req,res)=>{
    const {email,password} =req.body;
    if (!email || !password)
    return res.status(400).send({ error: 'Invalid request' })
    try{
    const users = await pool.query('SELECT * FROM users WHERE email =$1',[email])
    if(users.rows.length === 0)return res.status(401).json({error:"email is incorrect"});
   //password
    const checkpassword = await bcrypt.compare(password,users.rows[0].password);
    if(!checkpassword)return res.status(401).json({error:"incorrect password"});
    //jwt
     
    let tokens =jwtTokens(users.rows[0]);
    res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
    res.json(tokens)


}catch(err){
        res.json(err.message)
    }
})


export default router