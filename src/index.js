import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "../src/routes/router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
routes(app);

app.listen(3000, () => console.log("Server is running on port 3000"));
