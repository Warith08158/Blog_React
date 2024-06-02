import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as v4uuid } from "uuid";
import { auth } from "../../Firebase";
const UserImages = ({ name, email, posts, comments }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(null);

  const onLoadCoverImage = () => {
    setIsLoading(false);
  };
  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const changePhoto = (e) => {
    const file = e.target.files[0];
    if (!e.target.files[0]) {
      return;
    }
    const fileName = `${auth.currentUser.uid}-${v4uuid()}-${file.name} - ${
      e.target.id
    }`;

    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setLoadingPercentage(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
        setLoadingPercentage(null);
      }
    );
  };

  return (
    <figure className="mt-10 sm:mt-12 relative">
      <div className="absolute top-0 z-10 left-0 right-0">
        {loadingPercentage && (
          <div className="w-full rounded-t-lg bg-gray-200 h-2 dark:bg-gray-700">
            <div
              className="bg-primary-600 h-2 rounded-t-lg "
              style={{ width: `${loadingPercentage}%` }}
            ></div>
          </div>
        )}
      </div>

      <div>
        <img
          onLoad={onLoadCoverImage}
          className={`object-cover w-full max-w-full rounded-lg h-[330px] ${
            isLoading ? "hidden" : ""
          }`}
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="cover image"
        />
        {!loadingPercentage && (
          <label
            htmlFor="cover-photo"
            className="p-1 absolute bottom-4 right-4 rounded-full bg-gray-100 z-10 cursor-pointer"
          >
            <CiCamera className="text-red text-xl text-gray-600" />
          </label>
        )}
        <input
          className="hidden"
          type="file"
          name="coverPhoto"
          id="cover-photo"
          accept="image/jpeg, image/png"
          onChange={changePhoto}
        />
      </div>
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
          {!loadingPercentage && (
            <label
              htmlFor="avatar"
              className="p-1 absolute top-16 z-10 -right-2 rounded-full bg-gray-600 cursor-pointer"
            >
              <CiCamera className="text-red text-xl text-white" />
            </label>
          )}
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/jpeg, image/png"
            onChange={changePhoto}
          />
          {isLoadingImage && <div className="w-28 h-28 rounded-full"></div>}
        </div>
        <div className="flex items-center flex-col gap-2">
          <p className="text-white dark:text-gray-400 font-semibold text-xl tracking-wider">
            {name}
          </p>
          <p className="text-white dark:text-gray-400 text-md tracking-wide">
            {email}
          </p>
          <div className="flex items-center gap-8 lg:gap-12 mt-6">
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold tracking-wider text-white">
                {posts}
              </p>
              <p className="text-gray-100 tracking-wider text-sm">Posts</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold tracking-wider text-white">
                {comments}
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
