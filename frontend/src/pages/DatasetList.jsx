import React, { useEffect, useState } from "react";
import DatasetCard from "../components/DatasetCard";
import DatasetSearch from "../components/DatasetSearch";
import DatasetFilters from "../components/DatasetFilters";
import { Loader2 } from "lucide-react";

const DatasetList = () => {
  const [datasets, setDatasets] = useState([]);
  const [sector, setSector] = useState("");
  const [department, setDepartment] = useState("");
  const [classification, setClassification] = useState("");
  const [search, setSearch] = useState("");
  const [dataSetLoading, setDataSetLoading] = useState(false);
  const [isSectorsFetching, setIsSectorsFetching] = useState(true);
  const [isDepartmentsFetching, setIsDepartmentsFetching] = useState(true);
  const [allSectors, setAllSectors] = useState([]);
  const [allDepartments, setAllDepartemts] = useState([]);
  const [err, setErr] = useState("");

 // Fetch datasets whenever filters or search changes
  useEffect(() => {
    const fethchDatasets = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/api/datasets?sector=${encodeURIComponent(
            sector
          )}&classification=${encodeURIComponent(
            classification
          )}&search=${encodeURIComponent(
            search
          )}&department=${encodeURIComponent(department)}`
        );
        const data = await res.json();
        setDatasets(data.datasets);
      } catch (error) {
        setErr(error.message);
      } finally {
        setDataSetLoading(false);
      }
    };
    fethchDatasets();
  }, [search, sector, classification, department]);


  //fetch all the sectors once the page renders
  useEffect(() => {
    const fetchAllSectors = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/sectors");
        const data = await res.json();
        setAllSectors(data);
      } catch (error) {
        setErr(error.message || "Failed to fetch sectors");
      } finally {
        setIsSectorsFetching(false);
      }
    };
    fetchAllSectors();
  }, []);

  //fetch all the departments once the page renders
  useEffect(() => {
    const fetchALlDepartments = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/departments");
        const data = await res.json();
        setAllDepartemts(data);
      } catch (error) {
        console.log(error);
        setErr(error.message || "Failed to fetch sectors");
      } finally {
        setIsDepartmentsFetching(false);
      }
    };
    fetchALlDepartments();
  }, []);

  // show spinner while data is being fetched
  if (isSectorsFetching || isDepartmentsFetching || dataSetLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-3">
        <Loader2 className="animate-spin size-8" />
        <p>Loading datasets...</p>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col max-w-5xl mx-auto px-4">
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Dataset Discovery Portal</h1>
        <p className="text-base-content/70 mt-2">
          Browse and search registered datasets.
        </p>
      </div>
      {err && (
        <div className="alert alert-error my-4">
          <span>{err}</span>
        </div>
      )}
      <div className="mt-8">
        <DatasetFilters
          sector={sector}
          setSector={setSector}
          allSectors={allSectors}
          classification={classification}
          setClassification={setClassification}
          allDepartments={allDepartments}
          department={department}
          setDepartment={setDepartment}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="text-center my-5">
        <p className="text-xl">
          Showing {datasets.length} dataset
          {datasets.length !== 1 ? "s" : ""}
        </p>
      </div>

      {datasets.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h3 className="text-xl font-semibold">No datasets found</h3>

          <p className="text-base-content/70 mt-2">
            Try changing your filters or search query.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((d) => (
            <DatasetCard key={d.id} dataset={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DatasetList;
