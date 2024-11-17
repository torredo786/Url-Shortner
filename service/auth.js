const jwt = require("jsonwebtoken");
const secret = "saif$123";
function setUser( user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if (!token) return null; // Check if token is provided
    try {
      return jwt.verify(token, secret); // Attempt to verify the token
    } catch (error) {
      console.error("Token verification failed:", error.message); // Log the error
      return res.redirect("/login");
    }
}

module.exports = { setUser, getUser };
