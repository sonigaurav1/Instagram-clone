import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProfileAvatar from "../assets/profileAvatar.jpg";
import { useUserData } from "../store";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageList, setImageList] = useState([]);

  const { users } = useUserData();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/accounts/login/");
    }
    console.log(users)

    if (user) {
      console.log(user);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (users[0]?.username.length == 0) {
      window.location.replace("/");
    } else {
      const imageListRef = ref(getStorage(), `images/${users[0]?.username}/`);
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList([])
            setImageList((prev) => [...prev, url]);
          });
        });
      });
    }
  }, []);


  return (
    <>
      {isLoggedIn && (
        <div className="flex">
          <NavBar />
          <div className="mx-20 ml-60 ">
            <div className="mx-20 mt-10 ">
              <div className="flex">
                <div className="mx-20 my-4">
                  <img
                    className="size-40 rounded-full"
                    src={ProfileAvatar}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex justify-center space-x-3 ">
                    <div>
                    <h2>{users[0]?.fullName}</h2>
                    <h3>{users[0]?.username}</h3>
                    </div>
                    <button className="text-white bg-gray-800 py-1 px-3 rounded-md max-h-10">
                      Edit profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 space-x-1">
                {imageList.map((url, index) => {
                  return <img key={index} src={url} className="size-80" alt="" />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
