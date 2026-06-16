import React from "react";
import { Link } from "react-router-dom";

const DatasetCard = ({ dataset }) => {
  return (
    <Link
      to={`/datasets/${dataset.id}`}
      className="block bg-base-200 rounded-lg border shadow-sm hover:shadow-xl hover:scale-105 transition p-5"
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold">{dataset.title}</h2>

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
      </div>

      <div className="space-y-1 text-sm text-base-content/60">
        <p>
          <span className="font-medium">Department:</span> {dataset.department}
        </p>

        <p>
          <span className="font-medium">Sector:</span> {dataset.sector}
        </p>

        <p>
          <span className="font-medium">Last Updated:</span>{" "}
          {dataset.last_updated}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {dataset.formats?.map((format) => (
          <span
            key={format}
            className="px-2 py-1 text-xs badge badge-info badge-soft"
          >
            {format}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            dataset.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {dataset.status}
        </span>

        <span className="text-blue-400 text-sm font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default DatasetCard;
