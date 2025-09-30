const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const users = [
    { username: "admin", password: "admin123", role: "admin"},
    { username: "user", password: "user123", role: "user"},
];

exports.login = (req, res) => {
    const {username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid credentials"});

    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h"});
    res.json({ token });
};

exports.ping = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided"});
    
    const token = authHeader.split("")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: "Token is valid", user: decoded });
    } catch {
        res.status(401).json({ message: "Invalid token"});
    }
}