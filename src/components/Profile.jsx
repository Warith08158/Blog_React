import React from "react";
import UserDashBoardTextArea from "./UserDashBoardTextArea";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";

const Profile = () => {
  return (
    <section>
      <div className="flex flex-col gap-6 md:flex-row sm:items-start lg:gap-32">
        <div>
          <h5 className="text-lg font-semibold text-gray-950 dark:text-white">
            About Me
          </h5>
          <p className="mt-3 text-gray-600 max-w-md">
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
            <div className="flex items-center gap-2">
              <FaFacebookF className="text-primary-600 text-md" />
              Facebook
            </div>
            <div className="flex items-center gap-2">
              <FaSquareInstagram className="text-primary-600 text-md" />
              Instagram
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedinIn className="text-primary-600 text-md" />
              LinkedIn
            </div>
            <div className="flex items-center gap-2">
              <ImTwitter className="text-primary-600 text-md" />
              Twitter
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-16">
        <UserDashBoardTextArea />
        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
          You could select two images. The first one will be used as the cover
          photo .
        </p>
      </div>
    </section>
  );
};

export default Profile;
