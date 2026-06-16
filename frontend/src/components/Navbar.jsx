import React from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName);
  return (
    <div className="sticky top-0 flex justify-around bg-base-300 p-4 z-50">
      {/* logo */}
      <div className="font-bold">UP SDA Metadata Portal</div>

      <div>
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={`${
                pathName === "/" || pathName.startsWith("/datasets")
                  ? "text-primary "
                  : ""
              }`}
            >
              Discover Datasets
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className={`${pathName === "/register" ? "text-primary" : ""}`}
            >
              Register Dataset
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
