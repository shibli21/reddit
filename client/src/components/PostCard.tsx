import React from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { FaCommentAlt } from "react-icons/fa";
import { Post } from "../generated/graphql";

interface PostCardProps {
  postData: Post;
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  return (
    <div className="flex max-w-2xl my-6 border rounded-sm cursor-pointer hover:border-gray-500">
      <div className="flex flex-col items-center py-3 bg-gray-50 ">
        <div className="mx-1 p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-200">
          <ImArrowUp />
        </div>
        <h1 className="inline-block py-1">12.6k</h1>
        <div className="mx-1 p-1.5 text-gray-500 hover:text-blue-500 hover:bg-gray-200">
          <ImArrowDown />
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-row items-center">
          <img src="/r.svg" alt="" className="w-4 h-4 m-1 rounded-full" />
          <h1 className="mr-1 text-xs font-medium">r/{postData.subName}</h1>
          <h1 className="text-xs font-medium text-gray-500">
            Posted by u/{postData.user.username}
          </h1>
        </div>
        <h1 className="text-lg font-medium">{postData.title}</h1>
        <p className="mb-4 text-md">{postData.body}</p>
        <div className="flex">
          <div className="flex items-center font-medium text-gray-500">
            <FaCommentAlt className="mr-1 text-gray-500" />
            <h1 className="text-sm ">{postData.comments.length} Comments</h1>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PostCard;
