import { Search } from "lucide-react";

const DatasetSearch = ({ search, setSearch }) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <label className="input input-bordered input-lg flex items-center gap-3 w-full shadow-sm">
        <Search size={20} />

        <input
          type="text"
          className="grow"
          placeholder="Search by title or description ...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DatasetSearch;
