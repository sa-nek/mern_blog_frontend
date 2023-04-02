import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import { isAuthSelector } from "../../../store/slices/authSlice";

const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  const userId = useSelector((state) => state.auth.userData);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArr = tagsToArray(tags);
      const postData = { title, tags: tagsArr, text, imageUrl };
      const { data } = id
        ? await axios.patch(`/posts/${id}`, postData)
        : await axios.post("/posts", postData);
      id ? navigate("/") : navigate(`/posts/${data._id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const tagsToArray = (tagsStr) => {
    let str = tagsStr;
    if (str.includes(" ") || str.includes(".") || str.includes(",")) {
      str = str.trim();
      str = str.replace(" ", "");
      str = str.replace(".", "");
      str = str.replace(",", "");
      return tagsToArray(str);
    }
    if (str.includes("#")) {
      return str.split("#").filter((tag) => !!tag);
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          if (res.data.user._id !== userId._id) {
            navigate("/");
          }
          setTitle(res.data.title);
          setText(res.data.text);
          setImageUrl(res.data.imageUrl);
          setTags([""].concat(res.data.tags).join("#"));
        })
        .catch((err) => console.warn(err));
    }
  }, [userId]);

  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flexcentered items-start flex-auto p-4">
      <div className="bg-white flexcentered flex-col shadow-md w-full md:w-3/4 p-4 rounded-lg border">
        <h1 className="text-2xl p-2 font-medium">
          {id ? "Edit Post" : "Create Post"}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 w-full">
          {!imageUrl ? (
            <input
              onChange={handleFile}
              accept="image/*"
              type="file"
              className="file:p-3 file:mr-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-amber-200 file:text-black
      hover:file:bg-amber-300 file:cursor-pointer"
            />
          ) : (
            <>
              <img
                className="p-2 rounded-2xl"
                src={"https://bloggies-api.onrender.com" + imageUrl}
              />
              <button
                onClick={() => {
                  setImageUrl("");
                }}
              >
                <span className="border-b-4 border-orange-500 p-1 pb-2">
                  Delete Image
                </span>
              </button>
            </>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            className="text-2xl p-2 font-semibold"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Tags #tag1 #tag2"
            className="p-2"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[15rem] max-h-screen p-2"
            placeholder="Text"
          />
          <div className="w-full flexcentered justify-between gap-2 border-t">
            <button
              onClick={onSubmit}
              type="submit"
              className="p-2 border-b-4 border-amber-300"
            >
              {id ? "Save" : "Create"}
            </button>
            <button
              onClick={() => {
                setImageUrl("");
                setTags("");
                setText("");
                setTitle("");
              }}
              type="reset"
              className="p-2 border-b-4 border-amber-400"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
