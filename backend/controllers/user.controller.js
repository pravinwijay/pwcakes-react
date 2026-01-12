import userService from "../services/user.service.js";
import generateToken from "../utils/generateToken.js";

class UserController{

    async register(req, res){
        console.log("Données reçues :", req.body);
        try {
            const newUser = await userService.registerUser(req.body);
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res){
        try {
            const{email, password} = req.body;
            const user = await userService.loginUser(email, password);

            generateToken(res, user._id)

            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                message: "Connexion réussie"
            });
        } catch(error) {
            res.status(401).json({ message: error.message });
        }
    }

    async logout(req, res) {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0) 
        });
        res.status(200).json({ message: 'Déconnexion réussie' });
    }

    async getProfile(req, res) {
        const user = {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        };
        res.status(200).json(user);
    }

    async getUserById(req, res){
        try{
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch{
            res.status(404).json({ message: error.message });
        }
    }

    async getAllUser(req, res) {
        try {
            const users = await userService.getAllUser();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export default new UserController();

