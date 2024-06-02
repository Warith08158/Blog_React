import React, { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { auth, db } from "../../Firebase";
import {
  deleteField,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as v4uuid } from "uuid";

const UserImages = ({ name, email, posts, comments }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(null);
  const [images, setImages] = useState({ avatar: null, coverPhoto: null });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      // console.log(doc.data().avatar, doc.data().cover + "-" + photo);
      console.log(doc.data());
      setImages({
        coverPhoto: doc.data().coverPhoto ? doc.data().coverPhoto : null,
        avatar: doc.data().avatar ? doc.data().avatar : null,
      });
    });

    return () => {
      unsub();
    };
  }, []);

  const onLoadCoverImage = () => {
    setIsLoading(false);
  };
  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const changePhoto = (e) => {
    const image = e.target.id;
    const file = e.target.files[0];
    const fileName = `${auth.currentUser.uid}-${v4uuid()}-${
      file.name
    } - ${image}`;

    //current user uid
    const userUID = auth.currentUser.uid;

    //if an image is not selected
    if (!e.target.files[0]) {
      return;
    }

    //continue if an image is selected
    const docRef = doc(db, "users", userUID);
    const storage = getStorage();

    //check if an image is available in firestore
    async function ImageExists() {
      const docSnap = await getDoc(docRef);
      if (image in docSnap.data()) {
        return true;
      } else {
        return false;
      }
    }
    ImageExists().then((imageIsAvailable) => {
      imageIsAvailable ? updateImage() : addImage();
    });

    //if image is available in firestore
    async function updateImage() {
      try {
        //delete image from storage
        const docSnap = await getDoc(docRef);
        const desertRef = ref(storage, docSnap.data()[image]);
        await deleteObject(desertRef);

        //delete link from firestore
        const imageRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(imageRef, {
          [image]: deleteField(),
        });

        //add new image to storage
        addImage();
      } catch (error) {
        console.log(error);
      }

      //return
      return;
    }

    //if image is not available in firestore
    function addImage() {
      //add new image to storage
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoadingPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          //call add new link to firestore function
          addLinkToFirestore(downloadURL);
        }
      );

      //return
      return;
    }

    //add new link to firestore
    async function addLinkToFirestore(URL) {
      setLoadingPercentage(null);
      const updateImageURL = {
        [image]: URL,
      };

      try {
        await updateDoc(docRef, updateImageURL);
      } catch (error) {
        console.log(error);
      }
    }
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
        {images.coverPhoto ? (
          <img
            onLoad={onLoadCoverImage}
            className={`object-cover w-full max-w-full rounded-lg h-[330px] ${
              isLoading ? "hidden" : ""
            }`}
            src={images.coverPhoto}
            alt="cover image"
          />
        ) : (
          <div
            className={`object-cover w-full max-w-full rounded-lg h-[330px] ${
              isLoading ? "hidden" : ""
            }`}
          >
            <svg
              className=" text-gray-300 w-full h-full object-contain"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        )}

        {!loadingPercentage && (
          <label
            htmlFor="coverPhoto"
            className="p-1 absolute bottom-4 right-4 rounded-full bg-gray-100 z-10 cursor-pointer"
          >
            <CiCamera className="text-red text-xl text-gray-600" />
          </label>
        )}
        <input
          className="hidden"
          type="file"
          name="coverPhoto"
          id="coverPhoto"
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
          {images.avatar ? (
            <img
              onLoad={onLoadImage}
              className={`w-28 h-28 rounded-full object-cover ${
                isLoadingImage ? "hidden" : ""
              }`}
              src={images.avatar}
              alt="image"
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full ${
                isLoadingImage ? "hidden" : ""
              }`}
            >
              <svg
                className=" text-gray-200 w-full h-full object-contain"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          )}

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
