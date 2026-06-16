import DatasetSearch from "./DatasetSearch";

const DatasetFilters = ({
  sector,
  setSector,
  classification,
  setClassification,
  allSectors,
  department,
  allDepartments,
  setDepartment,
  search,
  setSearch,
}) => {
  return (
    <div className="">
      <DatasetSearch search={search} setSearch={setSearch} />
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-4">
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Sectors</option>

          {allSectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Classifications</option>
          <option value="Public">Public</option>
          <option value="Restricted">Restricted</option>
          <option value="Private">Private</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Departments</option>
          {allDepartments.map((d) => (
            <option value={d}>{d}</option>
          ))}
        </select>

        <button
          className="btn btn-md"
          onClick={() => {
            setSector("");
            setClassification("");
            setDepartment("");
            setSearch("");
          }}
        >
          Reset all filters
        </button>
      </div>
    </div>
  );
};

export default DatasetFilters;
