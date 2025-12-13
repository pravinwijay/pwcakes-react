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
}

export default new UserService();