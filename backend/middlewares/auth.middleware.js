import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";

const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userRepository.findById(decoded.userId);
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({message: "Non autorisé, token invalide"});
        }
    } else {
        res.status(401).json({message:"Non autorisé, aucun token trouvé"})
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé, réservé aux administrateurs" });
    }
}

export { protect, admin };