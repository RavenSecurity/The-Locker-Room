import express  from "express";
import  pool  from "../db/database.mjs";
import {authenticateToken} from "../function_token/authenticateToken.mjs"
const router=express.Router();


// get all messages in x lobby
// http://localhost:5000/api/lobby/:lobby_id?page=?&limit=?
router.get("/:lobby_id",authenticateToken,async(req,res)=>{
    //pagination
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const startIndex=(page - 1) * limit;
    const endIndex = page * limit;
    const result ={}

    try{
        
        const {lobby_id} =req.params
        const author_id = req.user.id;
        const admin = await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
        const lobby = await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[author_id,lobby_id])
        if(lobby.rowCount===0 && admin.rowCount===0){
            res.json('you are not in this lobby')
            
        }
        else{
            const allmessages=await pool.query('SELECT  messages.message,messages.author_id,users.name,users.id,messages.id,messages.lobby_id FROM messages,users WHERE users.id=messages.author_id AND lobby_id =$1 ORDER BY messages.id ASC',[lobby_id])
            //pagination
            if(endIndex < allmessages.rows.length){
                result.next ={
                    page: page + 1,
                    limit:limit
                }

            }

            if(startIndex > 0){
                result.previous ={
                    page: page - 1,
                    limit:limit
                }
                
            }
             result.result = allmessages.rows.slice(startIndex,endIndex)
            
            res.json(result)
        }
        
        
        
    }
   catch(err){
    console.error(err.message)
   }
})

//get one message in x lobby
router.get("/:lobby_id/:id",authenticateToken,async(req,res)=>{
    try{
        const author_id = req.user.id
        const {lobby_id,id} =req.params
        const admin = await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
        const lobby = await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[author_id,lobby_id])
        const messageExist=await pool.query('SELECT * FROM messages WHERE id=$1 AND lobby_id=$2',[id,lobby_id])
        if(lobby.rowCount===0 && admin.rowCount===0){
            res.json('you are not in this lobby')

        }
        else{
            if(messageExist.rowCount===0){
                res.json("message doesn't exist on this lobby")
            }
            else{
                const allmessages=await pool.query('SELECT messages.message,messages.author_id,users.name,users.id,messages.id,messages.lobby_id FROM messages,users  WHERE users.id=messages.author_id AND lobby_id =$1 AND messages.id =$2',[lobby_id,id])
                res.json(allmessages.rows[0])

            }

        }

    }
    catch(err){
        console.error(err.message)
    }
})

//add message
router.post('/:lobby_id',authenticateToken,async(req,res)=>{
    try{
        const {lobby_id}=req.params
        const {message} = req.body
        const author_id =req.user.id
        const admin = await pool.query('SELECT admin_id,id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
        if(!message)
        return res.status(400).send({ error: 'Invalid request' })
        const values = [message,author_id,lobby_id]
        const participants = await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[author_id,lobby_id])
    

     if(participants.rowCount===0 && admin.rowCount===0){
        res.json('not authorized')
     }
     else{
         const messages = await pool.query('INSERT INTO messages (message,author_id,lobby_id) VALUES ($1,$2,$3) RETURNING *',values)
         res.json(messages.rows[0])

     }

    }
    catch(err){
        res.json(err.message)
    }
})

//patch message

router.patch('/message/:message_id',authenticateToken,async(req,res)=>{
    try{
       const author_id =req.user.id;
       const {message} =req.body;
       const {message_id}=req.params;
      if(!message)return res.status(400).send({ error: 'Invalid request' })
      const message_exist = await pool.query('SELECT id FROM messages WHERE id=$1 AND author_id=$2',[message_id,author_id])
      if(message_exist.rowCount===0){
        res.json("this message doesn't exist or only admin can change this message")
      }
      else{
          const patchmessage = await pool.query('UPDATE messages SET message=$1 WHERE id=$2 AND author_id =$3 RETURNING *',[message,message_id,author_id])
          res.json(patchmessage.rows[0])

      }
    }
    catch(err){
        console.error(err.message)
    }
})


// delete message
 
router.delete('/message/:message_id',authenticateToken,async(req,res)=>{
    try{
        const author_id =req.user.id;
        
        const {message_id}=req.params;
       const message_exist = await pool.query('SELECT id FROM messages WHERE id=$1 AND author_id=$2',[message_id,author_id])
       if(message_exist.rowCount===0){
         res.json("this message doesn't exist or only admin can delete this message")
       }
       else{
           const deletemessage = await pool.query('DELETE FROM messages WHERE id=$1 AND author_id =$2',[message_id,author_id])
           res.json("message deleted")
 
       }
    }
    catch(err){
        res.json(err.message)
    }
})





export default router