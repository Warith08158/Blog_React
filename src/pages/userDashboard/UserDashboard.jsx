import React, { useState } from "react";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import Blog from "../../components/Blog";
import { LuDot } from "react-icons/lu";
import UserImages from "../../components/UserImages";

const Management = [
  {
    id: 1,
    name: "Profile",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Posts",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Blog",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const UserDashboard = () => {
  const [currentManagement, setCurrrentManagement] = useState("Profile");

  return (
    <section className="px-3 sm:px-10 py-3">
      <h4 className="text-2xl font-bold racking-wide text-gray-950 dark:text-white">
        Profile Information
      </h4>
      <div className="mt-2 flex items-center gap-3 flex-wrap">
        <p className="text-gray-400 dark:text-gray-400">Dashboard</p>
        <LuDot />
        <p className="text-gray-400 dark:text-gray-400">User</p>
        <LuDot />
        <p className="text-gray-700 dark:text-gray-400 font-semibold">
          Milan Jack
        </p>
      </div>
      <UserImages />
      <div className="py-4 text-gray-500 list-none list-inside mb-6">
        <ul className="flex gap-10 flex-wrap">
          {Management.map((manage) => (
            <li
              key={manage.name}
              onClick={() =>
                currentManagement === manage.name
                  ? null
                  : setCurrrentManagement(manage.name)
              }
              className={`flex items-center gap-1 cursor-pointer ${
                currentManagement === manage.name
                  ? "text-primary-600"
                  : "text-gray-600"
              } font-semibold tracking-wider text-sm`}
            >
              {manage.svg}
              {manage.name}
            </li>
          ))}
        </ul>
      </div>

      {currentManagement === "Profile" && <Profile />}
      {currentManagement === "Posts" && <Posts />}
      {currentManagement === "Blog" && <Blog />}
    </section>
  );
};

export default UserDashboard;
