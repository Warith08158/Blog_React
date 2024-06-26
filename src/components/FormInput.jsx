import React from "react";

const FormInput = ({
  type,
  name,
  id,
  placeholder,
  title,
  reference,
  disabled = false,
  readOnly = false,
  value,
}) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        required=""
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        ref={reference}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
};

export default FormInput;
