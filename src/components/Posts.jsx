import { MdEdit } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";

const Posts = () => {
  return (
    <div>
      <h5 className="text-lg font-semibold text-gray-950 dark:text-white mt-3 mb-4">
        Manage Posts
      </h5>
      <div className="bg-white border border-gray-200 shadow rounded-lg dark:bg-gray-800 dark:border-gray-700 py-4">
        <div className="px-4">
          <div className="mb-4">
            <p className="px-3 rounded-lg bg-primary-100 text-gray-600 inline">
              #Programming
            </p>
          </div>
          <div className="pb-2 flex flex-row justify-between gap-3 items-center flex-wrap">
            <div className="flex gap-4 items-center">
              <img
                className="object-contain h-16 w-16 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="image description"
              />
              <div>
                <h2 className="text-xl text-gray-800 font-medium tracking-normalj">
                  Ato Production
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-700 font-normal">
                    11 hours ago
                  </p>
                  <CiClock1 className="text-gray-800" />
                </div>
              </div>
            </div>
            <MdEdit className="text-2xl" />
          </div>
          <h1 className="mt-2 text-gray-800 text-xl font-semibold tracking-wide">
            How to become a Millionaire
          </h1>
          <p className="mb-2 mt-2 text-md text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            optio officia ipsum illum minima porro quidem aperiam, ab rem esse
            excepturi modi aliquid consequatur impedit ipsa nostrum ex itaque
            repudiandae.
          </p>
        </div>

        <img
          className="object-contain w-full max-w-full h-auto max-h-[500px] bg-black"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="image description"
        />

        <div className="px-4">
          <div className="w-full border-b border-gray-300 py-2 flex items-center justify-between">
            <div>32 Reactions</div>
            <div>10 comments</div>
          </div>
        </div>
        <div className="px-4">
          <div className="w-full border-b border-gray-300 py-2 flex items-center justify-between px-12 lg:px-32">
            <AiFillLike className="text-2xl" />
            <AiFillDislike className="text-2xl" />
            <FaCommentAlt className="text-xl" />
          </div>
        </div>

        <div className="flex items-center flex-row gap-4 mt-8 px-4">
          <img
            className="object-contain h-12 w-12 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="image description"
          />
          <form className="flex items-center w-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full flex gap-3">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-6 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comment as Milan"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;
