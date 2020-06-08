import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const PageWrapper = (props) => {
  return (
    <div className="bg-gray-100 min-h-screen border-t-4 border-indigo-700">
      <div className="container mx-auto">
        <div className="h-10 flex justify-between pt-3">
          <span className="ml-4 -mt-1">
            <span className="text-sm bg-indigo-700 text-white px-4 py-3 rounded-b">
              <Link to={`/`}>
                Control Shift <span className="font-semibold">Escape</span>
              </Link>
            </span>
            <span className="text-indigo-700 ml-2 uppercase text-sm font-semibold">
              Beta
            </span>
          </span>
          <span>
            <a href="https://github.com/asmartdev/control-shift-escape">
              <FaGithub className="h-5 w-5 text-indigo-700" />
            </a>
          </span>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default PageWrapper;
