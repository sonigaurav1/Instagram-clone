import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const NewImagePost = ({ image }) => {
  return (
    <section>
      <div className="w-[470px] border-b border-gray-700 mt-4 pb-4  ">
        <div className="flex items-center justify-between m-2">
          <div className="flex space-x-2 items-center ">

          <FaRegCircleUser className="size-6  " />
            <h2>Gaurav Soni</h2>
            <span className="">|</span>
            <p>17h</p>
            <span className="">|</span>
            <button className="text-blue-500 cursor-pointer">Follow</button>
          </div>
          <div>
            <svg
              className="cursor-pointer "
              aria-label="More options"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>More options</title>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </div>
        </div>
        <div className="flex justify-center">
          <img className="aspect-square size-96" src={image} alt="" />
        </div>
        <div className="flex justify-between m-2">
          <div className="flex space-x-4">
            {/* Like */}
            <svg
              aria-label="Like"
              className="cursor-pointer hover:fill-slate-500 transition-all"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              fill="currentColor"
            >
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
            {/* Comment */}
            <svg
              aria-label="Comment"
              className="cursor-pointer hover:fill-slate-500"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Comment</title>
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            {/* Share  */}
            <svg
              aria-label="Share Post"
              className="cursor-pointer hover:fill-slate-500"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Share Post</title>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
          </div>
          {/*  Bookmark  */}
          <svg
            aria-label="Save"
            className="cursor-pointer hover:fill-slate-500"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Save</title>
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </div>
        <p className="ml-2 font-normal">127 likes</p>
        <p className="ml-2 font-thin">18 minute ago</p>
      </div>
    </section>
  );
};

export default NewImagePost;
