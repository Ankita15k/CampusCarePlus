const { admin } = require("../config/firebase");



const ADMIN_EMAILS = ["mastervicky898@gmail.com", "rajv60701@gmail.com"];

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  // console.log(authHeader)
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    
    const token = authHeader.split(" ")[1];

  
    const decodedToken = await admin.auth().verifyIdToken(token);

  
    if (!ADMIN_EMAILS.includes(decodedToken.email)) {
      return res.status(403).json({ message: "Admin access only" });
    }

  
    req.admin = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
