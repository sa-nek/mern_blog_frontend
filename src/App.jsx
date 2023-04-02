import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import AddPost from "./components/HomePage/Posts/AddPost";
import FullPost from "./components/HomePage/Posts/FullPost";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { fetchMe, isAuthSelector } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route
          path="posts/:id"
          element={
            <div className="flexcentered w-full md:w-3/5 self-center pt-4">
              <FullPost />
            </div>
          }
        ></Route>
        <Route path="posts/:id/edit" element={<AddPost />}></Route>
        <Route path="createpost" element={<AddPost />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="*" element={<h2>ERROR</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
