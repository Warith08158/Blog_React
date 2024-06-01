import React from "react";

const InputSkeleton = () => {
  return (
    <div
      id="dropdown-states"
      className="absolute z-10 right-0 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 space-y-2 py-3 px-3"
    >
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
};

export default InputSkeleton;
