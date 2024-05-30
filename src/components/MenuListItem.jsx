import React from "react";

const MenuListItem = ({ text }) => {
  return (
    <p className="bg-transparent hover:bg-gray-50 py-1 text-gray-500 hover:text-gray-700 px-3 w-full text-left">
      {text}
    </p>
  );
};

export default MenuListItem;
