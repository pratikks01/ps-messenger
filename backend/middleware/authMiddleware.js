const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // removing the bearer and taking only the token
      // Bearer and then the tokern  dfjjlnvlnvlnvnv535jtn...
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoding and verifying the token

      req.user = await User.findById(decoded.id).select("-password"); // locate the resp. user in the DB and return it without selecting the password

      next(); // next operation
      // error block if the token not received or incorrect it will be redirecte to the catch block
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    // dont have token than this will execute after the 1st condition line 8
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
