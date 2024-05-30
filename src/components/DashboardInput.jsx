import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";

const DashboardInput = ({ htmlFor, title, id }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryInputVal, setCategoryInputVal] = useState("Choose category");
  const [subCategoryInputVal, setSubCategoryInputVal] =
    useState("Choose subcategory");
  const [subCategory, setSubCategory] = useState([]);

  const handleButtonClick = async (event) => {
    event.stopPropagation();
    setOpenMenu(true);

    if (categories.length === 0 || categories.length < 1) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (categories.length === 0 || categories.length < 1) {
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
    }

    if (event.target.id === "blog-subCategory") {
      setIsLoading(false);
    }
  };

  const categoryTitle = (event) => {
    event.stopPropagation();
    setOpenMenu(false);
    setCategoryInputVal(event.target.innerHTML);
    setSubCategory([
      ...categories.find(
        (eachCategory) => eachCategory.category === event.target.innerHTML
      ).subCategories,
    ]);
  };

  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <div className=" relative mt-2">
        <input
          id={id}
          placeholder={`choose ${title}`}
          value={
            id === "blog-Category" ? categoryInputVal : subCategoryInputVal
          }
          readOnly
          disabled
          className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <div
          id={id}
          className="absolute inset-0 bg-transparent"
          onClick={handleButtonClick}
        ></div>
      </div>

      {!IsLoading && openMenu && (
        <div
          id="dropdown-states"
          className="absolute z-10 right-0 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="states-button"
          >
            {categories.map((category) =>
              category.category.toUpperCase() ===
              categoryInputVal.toUpperCase() ? null : (
                <li
                  key={category.category}
                  onClick={categoryTitle}
                  id={category.category}
                >
                  <button
                    type="button"
                    className="inline-flex w-full truncate px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {category.category}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {openMenu && IsLoading && (
        <div
          id="dropdown-states"
          className="absolute z-10 right-0 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 space-y-2 py-3 px-3"
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default DashboardInput;
