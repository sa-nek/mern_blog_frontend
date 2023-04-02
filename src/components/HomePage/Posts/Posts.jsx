import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../store/slices/postsSlice";
import { useEffect } from "react";
import PostLoader from "../../Layout/Loader";

const Posts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const { posts } = useSelector((state) => state.posts);
  const isLoading = posts.status;
  return (
    <div className="flexcentered flex-col w-full h-full">
      {isLoading === "loading" ? (
        <>
          <PostLoader h={`35vw`} />
          <PostLoader h={`35vw`} />
        </>
      ) : (
        posts.items.map((post) => <Post key={post._id} post={post} />).reverse()
      )}
    </div>
  );
};

export default Posts;
