import NavBar from "../components/NavBar";
import ImagePost from "../components/ImagePost";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function Hero() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.replace("/accounts/login/");
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();

      const listRef = ref(storage, "images/");

      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // Get the download URL of the item.
            getDownloadURL(itemRef)
              .then((url) => {
                console.log(url);
                setImageUrls((prev) => [...prev, url]);
              })
              .catch((error) => {
                console.error(error.message);
              });
          });

          res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
            listAll(folderRef).then((subRes) => {
              subRes.items.forEach((itemRef) => {
                // Get the download URL of the item.
                getDownloadURL(itemRef)
                  .then((url) => {
                    console.log(url);
                    setImageUrls((prev) => [...prev, url]);
                  })
                  .catch((error) => {
                    console.error(error.message);
                  });
              });
            });
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    fetchImages();
  }, []);

  return (
    <>
        <div className="flex">
          <NavBar />
          <div className="mx-20 ml-60 ">
            <div className="mx-20 mt-10 ">
              {imageUrls.map((url) => {
                return <ImagePost image={url} key={url} />;
              })}
            </div>
          </div>
        </div>
    </>
  );
}


export default Hero;
