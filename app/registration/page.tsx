import React from "react";

function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Registration Closed</h1>
        <p className="text-gray-700 mt-2">We are sorry, but registration is no longer available.</p>
        <p className="text-gray-700 mt-2">If you still want to register visit our counter for registration</p>
      </div>
    </div>
  );
}

export default Page;
