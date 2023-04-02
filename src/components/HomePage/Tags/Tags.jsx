import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../../store/slices/postsSlice";
import TagsLoader from "../../Layout/Loader";
import Tag from "./Tag";

const Tags = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTags());
  }, []);
  const { tags } = useSelector((state) => state.posts);
  const isLoading = tags.status;
  return (
    <>
      {isLoading === "loading" ? (
        <>
          <TagsLoader h={`20vw`} />
        </>
      ) : (
        <div className="flexcentered flex-col w-full p-3 gap-2 items-start border rounded-md bg-white shadow-md">
          <span className="text-xl">Recent tags</span>
          <div className="w-full">
            {tags.items
              .map((tag, index) => <Tag key={index} text={tag} />)
              .reverse()
              .splice(0, 5)}
          </div>
        </div>
      )}
    </>
  );
};

export default Tags;
