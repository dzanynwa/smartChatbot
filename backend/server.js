import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import userData from './api/userData.route.js';

const app = express()

app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
app.use(express.json());

app.use("/api/v1/userdata", userData)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app;