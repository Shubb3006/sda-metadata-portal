import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DatasetDetail = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    const loadDataset = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5050/api/datasets/${id}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data?.message || "Something went wrong");
        }
        setDataset(data);
      } catch (error) {
        setErr(error.message || "Failed to fetch the details of the dataset");
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-3">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      {err ? (
        <div className="alert alert-error my-4">
          <span>{err}</span>
        </div>
      ) : (
        <div className="bg-base-100 shadow-lg rounded-lg p-6">
          {/* Back Button Row */}
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700 transition"
            >
              ← Back to all datasets
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">{dataset.title}</h1>

          <div className="flex gap-2 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataset.classification === "Public"
                  ? "badge badge-soft badge-success"
                  : dataset.classification === "Restricted"
                  ? "badge badge-soft badge-warning"
                  : "badge badge-soft badge-accent"
              }`}
            >
              {dataset.classification}
            </span>

            <span className="badge badge-outline">{dataset.status}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">Department</p>
              <p>{dataset.department}</p>
            </div>

            <div>
              <p className="font-semibold">Sector</p>
              <p>{dataset.sector}</p>
            </div>

            <div>
              <p className="font-semibold">Coverage</p>
              <p>{dataset.coverage}</p>
            </div>

            <div>
              <p className="font-semibold">Update Frequency</p>
              <p>{dataset.update_frequency}</p>
            </div>

            <div>
              <p className="font-semibold">Last Updated</p>
              <p>{dataset.last_updated}</p>
            </div>

            <div>
              <p className="font-semibold">Record Count</p>
              <p>{dataset.record_count?.toLocaleString()}</p>
            </div>
          </div>

          <div className="divider"></div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>

          <p>{dataset.description}</p>

          <div className="divider"></div>

          <h2 className="text-xl font-semibold mb-2">Formats</h2>

          <div className="flex gap-2 flex-wrap">
            {dataset.formats?.map((format) => (
              <span key={format} className="badge badge-accent badge-soft">
                {format}
              </span>
            ))}
          </div>

          <div className="divider"></div>
          {Array.isArray(dataset.tags) && dataset.tags.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-2">Tags</h2>

              <div className="flex gap-2 flex-wrap">
                {dataset.tags?.map((tag) => (
                  <span key={tag} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DatasetDetail;
