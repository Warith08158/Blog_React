import React, { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import InputSkeleton from "../skeletonLoader/InputSkeleton";
import MenuListItem from "./MenuListItem";

const Blog = () => {
  const [value, setValue] = useState({
    category: "Choose category",
    subCategory: "Choose subcategory",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(null);
  const [showMenu, setShowMenu] = useState({
    categoryMenu: false,
    subCategoryMenu: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const categoryInputRef = useRef();
  const subCategoryInputRef = useRef();
  const blogTitle = useRef();

  const { category, subCategory } = value;
  const { categoryMenu, subCategoryMenu } = showMenu;

  useEffect(() => {
    const handleClick = () => {
      setShowMenu({ categoryMenu: false, subCategoryMenu: false });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const fetchCategory = async (event) => {
    event.stopPropagation();
    setShowMenu({ ...showMenu, categoryMenu: true });
    if (categories.length > 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Blog_Categories"));
      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        categoriesData.push(doc.data());
      });
      setCategories([...categoriesData]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategory = (event) => {
    event.stopPropagation();
    setShowMenu({ ...showMenu, subCategoryMenu: true });
    const matchingSubCategories = categories.find(
      (eachCategory) => eachCategory.category === newCategory
    );
    setSubCategories([...matchingSubCategories.subCategories]);
  };
  const formSubmit = (e) => {
    e.preventDefault();
  };

  const handleCategoryOnClick = (category) => {
    if (newCategory === category) {
      return;
    }
    setValue({ category: category, subCategory: "Choose subcategory" });
    setNewCategory(category);
  };

  const handleSubCategoryOnClick = (subCategory) => {
    setValue({ ...value, subCategory: subCategory });
  };
  return (
    <div>
      <h5 className="text-lg font-semibold text-gray-950 dark:text-white mt-3 mb-4">
        Create a Blog
      </h5>
      <form className="" onSubmit={formSubmit}>
        <div className="flex-wrap flex gap-6">
          <FormInput
            type="text"
            name="Title"
            id="blogTitle"
            placeholder="Title of blog"
            title="Title"
            reference={blogTitle}
          />

          <div className="relative">
            <FormInput
              type="text"
              name="Category"
              id="Category"
              placeholder="Choose category"
              title="Category"
              readOnly={true}
              disabled={true}
              reference={categoryInputRef}
              value={category}
            />
            <button
              className="absolute inset-0 bg-transparent"
              onClick={fetchCategory}
              type="button"
            ></button>
            {isLoading && categoryMenu && <InputSkeleton />}
            {!isLoading && categoryMenu && (
              <div className="absolute z-10 right-0 text-left left-0 bg-white divide-gray-100 rounded-lg shadow space-y-2 py-3 ">
                {categories.map((category) =>
                  newCategory === category.category ? null : (
                    <div
                      key={category.category}
                      onClick={() => handleCategoryOnClick(category.category)}
                    >
                      <MenuListItem text={category.category} />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <FormInput
              type="text"
              name="Subcategory"
              id="Subcategory"
              placeholder="choose subcategory"
              title="Subcategory"
              readOnly={true}
              disabled={true}
              reference={subCategoryInputRef}
              value={subCategory}
            />
            <button
              className="absolute inset-0 bg-transparent"
              onClick={fetchSubCategory}
              type="button"
            ></button>
            {setSubCategories.length > 0 && newCategory && subCategoryMenu && (
              <div className="absolute z-10 right-0 text-left left-0 bg-white divide-gray-100 rounded-lg shadow space-y-2 py-3 ">
                {subCategories.map((subCategory) => (
                  <div
                    key={subCategory}
                    onClick={() => handleSubCategoryOnClick(subCategory)}
                  >
                    <MenuListItem text={subCategory} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400 mt-3">
          Selecting Categories and Subcategories that fit your blog will help
          users to find blogs easily.
        </p>
        <div className="mt-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Blog
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="flex items-center justify-center w-full mt-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        <div className="flex justify-end mt-4 ">
          <button
            type="submit"
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 "
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
