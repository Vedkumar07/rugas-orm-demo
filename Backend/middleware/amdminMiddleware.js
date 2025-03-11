const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function amdminMiddleware(req, res, next) {
    const auth = req.headers["authorization"];
    
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = auth.split(" ")[1];
    console.log(`Token: ${token}`);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;  // Ensure `id` is used while signing the token
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", error: error.message });
    }
}

module.exports = {
    amdminMiddleware:amdminMiddleware
};
