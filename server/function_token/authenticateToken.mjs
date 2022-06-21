import jwt from 'jsonwebtoken';


export  async function authenticateToken(req, res, next) {
    const authHeader = await req.headers['authorization']
    const token = await authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).json({error:"null token"});
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(error,user) => {
      if (error) return res.status(403).json({error:error.message});
  
      req.user = user
  
      next()
    })
  }
