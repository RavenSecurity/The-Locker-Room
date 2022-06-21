import express  from "express";
import bcrypt from 'bcrypt';
 import  pool  from "../db/database.mjs";

const router=express.Router();
import {authenticateToken} from "../function_token/authenticateToken.mjs"




   router.get('/users/:lobby_id/:id',authenticateToken,async(req,res)=>{
    try{
        const author_id=req.user.id
        const {lobby_id,id} = req.params
        const lobby= await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[author_id,lobby_id])
        const admin = await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
           const participants = await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[id,lobby_id])
           if(lobby.rowCount===0&&admin.rowCount===0){
            res.json('not access')
           }
           else{

               if(participants.rowCount===0){
                res.json("user doesn't exist in this lobby")
               }
               else{
                   const users = await pool.query("SELECT users.id,users.name,participants.lobby_id FROM users,participants  WHERE users.id=participants.user_id AND lobby_id=$1 AND users.id =$2",[lobby_id,id])
                   res.json(users.rows[0])
    
               }
           }

        
    }
    catch(err){
        console.error(err.message)

    }
   });
   
   router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password)
    return res.status(400).send({ error: 'Invalid request' })
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const values= [name,email,hashedpassword]
        const users = await pool.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',values)
        res.json(users.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

router.get('/hello',authenticateToken, (req, res) => {
 res.send({ info: 'Hello ' + req.user.name })
})

export default router
