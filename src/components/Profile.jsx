import React from "react";
import UserDashBoardTextArea from "./UserDashBoardTextArea";

const Profile = () => {
  return (
    <section>
      <div className="flex flex-col gap-6 md:flex-row sm:items-start lg:gap-32">
        <div className="flex-1">
          <h5 className="text-lg font-semibold text-gray-950 dark:text-white">
            About Me
          </h5>
          <p className="mt-3 text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ipsum veniam asperiores omnis commodi placeat. Aliquam sequi nisi
            magni sunt! Vero ullam aperiam, veritatis eveniet accusamus ipsa
            nulla a deleniti! Soluta voluptate quaerat eos, tempore blanditiis
            ex
          </p>
        </div>

        <div className="lg:pr-8">
          <h5 className="text-lg font-semibold text-gray-950 dark:text-white">
            Social Media Links
          </h5>
          <div className="mt-3 text-gray-600 space-y-2">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Tik Tok</p>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-16">
        <UserDashBoardTextArea />
      </div>
    </section>
  );
};

export default Profile;
