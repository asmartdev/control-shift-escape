import React from "react";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto py-16 lg:py-32 px-4">
      <h1 className="text-6xl font-extrabold text-indigo-700 text-center">
        404
      </h1>
      <div className="mt-16">
        <div>
          <p className="mb-4 text-center">
            You can't escape a room that doesn't exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
