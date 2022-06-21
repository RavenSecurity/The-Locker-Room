import pkg from "pg";
const {Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config()


 const pool = new Pool({
   connectionString:process.env.DB_CONNECTION_STRING,
   ssl: {
    rejectUnauthorized: false
  }
});

export default pool

// const users = `
// CREATE TABLE IF NOT EXISTS users (
//     "id" BIGSERIAL PRIMARY KEY,
//     "name" VARCHAR NOT NULL,
//     "email" VARCHAR NOT NULL UNIQUE,
//     "password" VARCHAR NOT NULL
    
    
// );`;

// const messages =`
// CREATE TABLE IF NOT EXISTS messages (
//     "id" BIGSERIAL PRIMARY KEY,
//     "message" VARCHAR NOT NULL,
//     "author_id" BIGINT NOT NULL,
//     "lobby_id" BIGINT NOT NULL
    
    

// );`;

// const lobby  =`
// CREATE TABLE IF NOT EXISTS lobby (
//     "id" BIGSERIAL PRIMARY KEY,
//     "name" VARCHAR NOT NULL,
//     "admin_id" BIGINT NOT NULL 
    
// )`;

// const participants  =`
// CREATE TABLE IF NOT EXISTS participants (
//     "id" BIGSERIAL PRIMARY KEY,
//     "lobby_id" BIGINT NOT NULL,
//     "user_id" BIGINT NOT NULL 
    
// )`;

// const execute = async (query) => {
//     try {
//         await pool.connect();     
//         await pool.query(query);  
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } 
    
        
        
    
// };


    
        
// execute(participants).then(result => {
//     if (result) {
//         console.log('Tables created succesfully');
//     }
// });





