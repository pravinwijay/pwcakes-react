import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db.js : Connexion réussie")
    } catch(error) {
        console.error(`db.js : ERROR: ${error.message}`);
        process.exit(1)
    }
};

export default connectDB;