import User from "../models/user.model.js";

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email){
        return await User.findOne({email})
    }

    async findById(id){
        return await User.findById(id);
    }

    async findAll(){
        return await User.find({})
    }
}

export default new UserRepository();