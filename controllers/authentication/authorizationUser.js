const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const authorization = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = data.id;
      req.userRole = data.role;
      return res.json({message: "You're authenticated!"});
    } catch {
      return res.sendStatus(403);
    }
};

module.exports = authorization;