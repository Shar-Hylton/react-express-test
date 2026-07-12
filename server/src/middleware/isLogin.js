// Old Session Method
// module.exports = (req, res, next)=>{
//     if(!req.session || !req.session.user){
//         req.session.error = 'Please log in or register to edit or delete note';
//         console.log("isLogin error thrown")
//         return res.status(401).json({error: "Please log in"});
//     }

//     next();
// }

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Please log in",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if(!user){
        return res.status(401).json({
            error: "User no longer exists",
        });
    }

    req.user = user;

    next();

  } catch {
    return res.status(401).json({
      error: "invalid credentials",
    });
  }
};
