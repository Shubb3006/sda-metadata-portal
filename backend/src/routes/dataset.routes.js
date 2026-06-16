import express from 'express';
import { addDataset, getDatasets } from '../conrtrollers/dataset.controller.js';
import { getDataSetById } from '../conrtrollers/dataset.controller.js';


const router=express.Router();

router.get("/",getDatasets)
router.get("/:id",getDataSetById)
router.post("/",addDataset)

export default router;