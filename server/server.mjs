import express from "express";
import cookieParser from "cookie-parser";
import  usersRouter  from "./routes/users-routes.mjs";
import authRouter from './routes/auth-routes.mjs';
import lobbyRouter from './routes/lobby-routes.mjs';
import adminRouter from './routes/admin-routes.mjs'
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.get('/',(req,res)=>res.send({info:`hello`}));
app.use(cors())



app.use('/api',usersRouter)
app.use('/api',authRouter)
app.use('/api/lobby',lobbyRouter)
app.use('/api/admin',adminRouter)

app.listen(PORT,()=>console.log(`server started:http://localhost:${PORT}/`))