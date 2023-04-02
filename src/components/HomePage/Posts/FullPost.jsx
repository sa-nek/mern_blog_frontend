import axios from "../../../axios";
import { useEffect, useState } from "react";
import {
  FaCommentDots,
  FaEdit,
  FaEye,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../Tags/Tag";
import PostLoader from "../../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletePost } from "../../../store/slices/postsSlice";

const FullPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const isOwner = () => {
    if (user) {
      return user._id === post.user._id;
    } else {
      return false;
    }
  };
  const deletePost = async () => {
    dispatch(fetchDeletePost(id));
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((post) => {
        setPost(post.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) return <PostLoader h={"50vw"} />;

  return (
    <div className="relative flexcentered flex-auto flex-col border rounded-md p-2 m-2 w-full bg-white shadow-md">
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
      {post.text && (
        <span className="p-2 w-full flex break-all">{post.text}</span>
      )}
      <div className="flex w-full p-2">
        <FaEye size={"1.5rem"} className="mr-2 text-amber-200" />
        <span className="mr-2">{post.views || 0}</span>
        <FaCommentDots size={"1.5rem"} className="mr-2 text-amber-300" />
        <span className="mr-2">0</span>
      </div>
      {isOwner() && (
        <div className="flex absolute bottom-0 right-0 p-5 gap-10">
          {
            <>
              <FaEdit
                onClick={() => {
                  navigate(`/posts/${id}/edit`);
                }}
                className="cursor-pointer hover:bg-amber-200 p-3 hover:rounded-lg text-slate-600"
                size={"2.75rem"}
              />
              <FaTrash
                onClick={deletePost}
                className="cursor-pointer hover:bg-amber-200 p-3 hover:rounded-lg text-slate-600"
                size={"2.75rem"}
              />
            </>
          }
        </div>
      )}
    </div>
  );
};

export default FullPost;
