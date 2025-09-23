import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/database.js';
import { userRoutes } from './src/routes/user.routes.js';
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({
origin: "http://localhost:4000",
credentials: true // CRUCIAL: permitir cookies
}));
app.use(cookieParser()); // NECESARIO: para leer req.cookies

app.use ("/api",userRoutes);


app.listen(PORT, async () => {
    await connectDB();
  console.log(`El server está corriendo en: http://localhost:${PORT}`)
})