import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const RegisterDataset = () => {
  const [data, setData] = useState({
    title: "",
    department: "",
    sector: "",
    formats: [],
    update_frequency: "",
    coverage: "",
    description: "",
    classification: "",
    tags: "",
  });

  const errRef = useRef(null);

  const [allsectors, setAllSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAllSectors = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/sectors");
        const data = await res.json();
        setAllSectors(data);
      } catch (error) {
        setErr(error.message || "Failed to fetch sectors");
      } finally {
        setLoading(false);
      }
    };
    fetchAllSectors();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetValues = () => {
    setData({
      title: "",
      department: "",
      sector: "",
      formats: [],
      update_frequency: "",
      coverage: "",
      description: "",
      classification: "",
      tags: "",
    });
  };

  const formValid = () => {
    return (
      data.title?.trim() &&
      data.department?.trim() &&
      data.sector?.trim() &&
      data.classification?.trim() &&
      data.update_frequency?.trim() &&
      data.formats.length > 0 &&
      data.description?.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccessMessage("");
    const payload = {
      ...data,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const success = formValid();
    if (!success) {
      setErr("Inputs are required");

      setTimeout(() => {
        errRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);

      return;
    }

    try {
      setIsAdding(true);
      const res = await fetch("http://localhost:5050/api/datasets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to register dataset");
      }
      setErr("");
      setSuccessMessage("Dataset registered successfully!");
      resetValues();
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleFormatChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setData((prev) => ({
        ...prev,
        formats: [...prev.formats, value],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        formats: prev.formats.filter((f) => f !== value),
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="card bg-base-100 shadow-xl border">
        <div className="card-body">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Register Dataset</h1>
            <p className="text-base-content/70 mt-2">
              Register a new dataset for the UP SDA Metadata Portal.
            </p>
          </div>
          {successMessage && (
            <div className="alert alert-success mb-6">
              <span>{successMessage}</span>
            </div>
          )}
          {err && (
            <div ref={errRef} className="alert alert-error mb-4">
              <span>{err}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Dataset title"
                />
              </div>

              {/* Department */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Department *</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={data.department}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Revenue Department"
                />
              </div>

              {/* Sector */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Sector *</span>
                </label>
                <select
                  name="sector"
                  value={data.sector}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Sector</option>

                  {allsectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Coverage */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Coverage Level
                  </span>
                </label>
                <select
                  name="coverage"
                  value={data.coverage}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Coverage</option>
                  <option value="Village">Village</option>
                  <option value="Block">Block</option>
                  <option value="District">District</option>
                  <option value="Division">Division</option>
                  <option value="State">State</option>
                </select>
              </div>

              {/* Update Frequency */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Update Frequency *
                  </span>
                </label>
                <select
                  name="update_frequency"
                  value={data.update_frequency}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>

              {/* Classification */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Classification *
                  </span>
                </label>

                <select
                  name="classification"
                  value={data.classification}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Classification</option>
                  <option value="Public">Public</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>

            {/* Formats */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Data Formats *</span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["CSV", "XLSX", "JSON", "API", "PDF", "GeoJSON"].map(
                  (format) => (
                    <label
                      key={format}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={format}
                        checked={data.formats.includes(format)}
                        onChange={handleFormatChange}
                        className="checkbox checkbox-primary"
                      />
                      <span>{format}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Description *</span>
              </label>

              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows={6}
                placeholder="Describe the dataset..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Tags</span>
              </label>

              <input
                type="text"
                name="tags"
                value={data.tags}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="land, revenue, records"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="reset"
                className="btn btn-outline"
                onClick={resetValues}
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isAdding}
                className="btn btn-primary"
              >
                {isAdding ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Register Dataset"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDataset;
