import { FaCommentDots, FaEye, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tag from "../Tags/Tag";

const Post = ({ post }) => {
  const navigator = useNavigate();
  return (
    <div
      onClick={() => {
        navigator(`/posts/${post._id}`);
      }}
      className=" cursor-pointer flexcentered flex-auto flex-col border rounded-md p-2 m-2 w-full bg-white shadow-md hover:border-gray-400 hover:border-2"
    >
      {post.imageUrl && (
        <img
          src={"https://bloggies-api.onrender.com" + post.imageUrl}
          className="p-2 drop-shadow w-full rounded-xl"
        ></img>
      )}
      <div className="flexcentered justify-start w-full">
        {post.user && post.user.avatarUrl ? (
          <img
            className="h-14 w-14 rounded-full p-1 object-cover"
            src={post.user.avatarUrl || ""}
          />
        ) : (
          <FaUserCircle size={"3rem"} className="p-1 text-amber-300" />
        )}

        <div className="pl-2">
          <h3>{post.user ? post.user.fullName : "undefined"}</h3>
          <h4 className="text-sm text-slate-500">
            {post.createdAt || "undefined"}
          </h4>
        </div>
      </div>
      <h2 className="w-full text-lg font-bold p-2">{post.title}</h2>
      <div className="flexcentered w-full justify-start">
        {post.tags ? (
          post.tags.map((tag, index) => <Tag text={tag} key={index} />)
        ) : (
          <Tag />
        )}
      </div>
      <div className="flex w-full p-2">
        <FaEye size={"1.5rem"} className="mr-2 text-amber-200" />
        <span className="mr-2">{post.views || 0}</span>
        <FaCommentDots size={"1.5rem"} className="mr-2 text-amber-300" />
        <span className="mr-2">0</span>
      </div>
    </div>
  );
};

export default Post;
