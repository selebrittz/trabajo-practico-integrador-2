import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/database.js';
import { userRoutes } from './src/routes/user.routes.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from './src/routes/auth.routes.js';
import { articleRoutes } from './src/routes/article.routes.js';
import { commentRoutes } from './src/routes/comment.routes.js';
import { tagRoutes } from './src/routes/tag.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({
origin: "http://localhost:4000",
credentials: true // CRUCIAL: permitir cookies
}));
app.use(cookieParser()); // NECESARIO: para leer req.cookies

app.use ("/api/auth",authRoutes);
app.use ("/api",userRoutes);
app.use ("/api", articleRoutes);
app.use ("/api", commentRoutes);
app.use ("/api", tagRoutes);

app.listen(PORT, async () => {
    await connectDB();
  console.log(`El server está corriendo en: http://localhost:${PORT}`)
})