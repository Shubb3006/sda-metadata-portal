import data from "../../../data/seed_datasets.json" with{type:"json"}
export const getDatasets=async(req,res)=>{
    try {
        let result=[...data]
        const { sector, classification, status, search,department } = req.query;
        if (sector) {
            result = result.filter(d => d.sector.toLowerCase() === sector.toLowerCase());
        }
        if (classification) {
            result = result.filter(d => d.classification.toLowerCase() === classification.toLowerCase());
        }
        if (status) {
            result = result.filter(d => d.status.toLowerCase() === status.toLowerCase());
        }
        if (department) {
            result = result.filter(d => d.department.toLowerCase() === department.toLowerCase());
        }
        if (search) {
            result=result.filter((d)=>
                d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
            )
        }
        return res.json({datasets:result})
    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
}

export const getDataSetById=async(req,res)=>{
    try {
        const dataset=data.find(d=>d.id===req.params.id)
        if (!dataset) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        
        res.json(dataset);
    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
}

export const addDataset=async(req,res)=>{
    try {
        const {title, department, sector, formats, update_frequency, description, classification,coverage,tags}=req.body;

        if (
            !title?.trim() ||
            !department?.trim() ||
            !sector?.trim() ||
            !formats ||
            !update_frequency?.trim() ||
            !description?.trim()||
            !classification?.trim()
          ) {
            return res.status(422).json({
              message: "Missing required fields"
            });
          }

          const newDataset = {
            id: `UP-CUSTOM-${Date.now()}`,
            title,
            department,
            sector,
            formats,
            update_frequency,
            description,
            classification,
            status: "Registered",
            last_updated: new Date().toISOString().split("T")[0],
            record_count: 0,
            coverage: coverage||"State",
            tags: tags||[]
          };
          data.push(newDataset);

          return res.status(201).json(newDataset);

    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
}