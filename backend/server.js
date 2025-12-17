import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
    console.log(`SWAGGER : http://localhost:${port}/swagger`);
});

