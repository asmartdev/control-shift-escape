import React from "react";
import { Link } from "react-router-dom";

const PageWrapper = props => {
  return (
    <div className="bg-gray-100 min-h-screen border-t-4 border-indigo-700">
      <div className="container mx-auto">
        <Link to={`/`}>
          <span className="bg-indigo-700 text-white px-4 py-3 absolute top-0 rounded text-sm mx-4">
            Control Shift <span className="font-semibold">Escape</span>
          </span>
        </Link>
      </div>
      {props.children}
    </div>
  );
};

export default PageWrapper;
