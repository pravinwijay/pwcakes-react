import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";

class UserService {
    async registerUser(userData){
        const { username, email, password, telephone } = userData;
        const userExists = await userRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error("Cet email est déjà utilisé.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userToCreate = {
            username,
            email,
            telephone,
            password: hashedPassword
        };
        return await userRepository.create(userToCreate);
    }

    async loginUser(email, password){
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new Error("Identifiants invalides.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Identifiants invalides.");
        }
        return user;
    }

    async getUserById(id){
        const user = await userRepository.findById(id);
        if (!user) throw new Error("Utilisateur non trouvé.");
        return user;
    }

    async getAllUsers(){
        return await userRepository.findAll();
    }

    async updateUserProfile(id, data){
        const updatedUser = await userRepository.update(id, data);
        if (!updatedUser) throw new Error("Utilisateur non trouvé.");
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await userRepository.delete(id);
        if (!deletedUser) throw new Error("Utilisateur non trouvé.");
        return deletedUser;
    }
}

export default new UserService();