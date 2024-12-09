import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import studentsRoute from "./routes/studentsRoute.js";
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
require('dotenv').config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000


app.use(bodyParser.json());
app.use(cors());
app.use('/api/students', studentsRoute)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})