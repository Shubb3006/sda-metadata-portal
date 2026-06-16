import express from "express";
import  cors  from 'cors';
import datasetRoutes from "../src/routes/dataset.routes.js"
import  data  from "../../data/seed_datasets.json" with {type:"json"}

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/datasets",datasetRoutes)

app.get("/api/sectors",async(req,res)=>{
    try {
        const sectors=[...new Set(data.map((d)=>d.sector))];
        return res.json(sectors);
    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
})

app.get("/api/departments",async(req,res)=>{
    try {
        const departments=[...new Set(data.map((d)=>d.department))];
        return res.json(departments);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message:error.message });
    }
})

const PORT=5050

app.listen(PORT,()=>{
    console.log(`Server is listening on port : ${PORT}`)
})