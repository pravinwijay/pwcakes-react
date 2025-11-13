import connectDB from "./config/db"

dotenv.config()
const port = process.env.PORT || 5000;

connectDB();

const app = express();