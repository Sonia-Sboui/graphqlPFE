const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
    const authHeader = req.get ('Authorization');
    if (!authHeader){
        req.isAuth = false;
        return next ();
    }

// have an authorization but not a valid token

const token = authHeader.split (' ')[1];//index one| form token except authorization: Bearer token_value split with white space
if (!token || token === ''){
    req.isAuth = false;
    return next();
}
  // verify token
  let decodedToken;
  try{
decodedToken= jwt.verify(token,'supersecretkey');
  }catch (err){
      req.isAuth=false;
      return next();
  }
  if (!decodedToken){
      req.isAuth = false;
      return next ();
  }
  // if valid token
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};