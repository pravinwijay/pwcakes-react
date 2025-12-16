import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`server.js : Serveur démarré sur le port ${port}`);
    console.log(`server.js : URL: http://localhost:${port}`);
});

