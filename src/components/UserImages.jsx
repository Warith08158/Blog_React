import React, { useState } from "react";

const UserImages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const onLoadCoverImage = () => {
    setIsLoading(false);
  };
  const onLoadImage = () => {
    setIsLoadingImage(false);
  };
  return (
    <figure className="mt-10 sm:mt-12 relative">
      <img
        onLoad={onLoadCoverImage}
        className={`object-cover w-full max-w-full rounded-lg h-[330px] ${
          isLoading ? "hidden" : ""
        }`}
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="cover image"
      />
      {isLoading && (
        <div className="w-full max-w-full rounded-lg h-[330px]"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r rounded-lg from-black via-transparent/70 to-black opacity-90"></div>
      <div className="absolute top-6 left-0 right-0 flex items-center flex-col gap-6 justify-center">
        <div className="relative border-2 border-white rounded-full">
          <img
            onLoad={onLoadImage}
            className={`w-28 h-28 rounded-full ${
              isLoadingImage ? "hidden" : ""
            }`}
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="image"
          />
          {isLoadingImage && <div className="w-28 h-28 rounded-full"></div>}
        </div>
        <div className="flex items-center flex-col gap-2">
          <p className="text-white dark:text-gray-400 font-semibold text-xl tracking-wider">
            Milan Jack
          </p>
          <p className="text-white dark:text-gray-400 text-md tracking-wide">
            UI/UX Designer
          </p>
          <div className="flex items-center gap-8 lg:gap-12 mt-6">
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold tracking-wider text-white">
                20
              </p>
              <p className="text-gray-100 tracking-wider text-sm">Posts</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold tracking-wider text-white">
                300
              </p>
              <p className="text-gray-100 tracking-wider text-sm">Comments</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default UserImages;
