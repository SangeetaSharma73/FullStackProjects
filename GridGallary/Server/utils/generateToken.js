// const jwt= require('jsonwebtoken');

// generateToken= (userId)=>{
//     return jwt.sign({id:userId},process.env.JWT_SECRET),{
//         expiresIn:'7d',
//     }
// }

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
