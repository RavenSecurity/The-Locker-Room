import jwt from 'jsonwebtoken';

export default function jwtTokens({id,name,email}){
    const user = {id,name,email};
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
    const refreshToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"3600s"});
    return ({accessToken,refreshToken})   
}