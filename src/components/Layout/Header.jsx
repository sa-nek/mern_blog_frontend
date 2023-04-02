import { FaBullseye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAuthSelector, logout } from "../../store/slices/authSlice";

const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <header className="flexcentered w-full border justify-between p-2 h-20 shadow-md">
      <h2
        className="text-slate-900 rounded-md flexcentered px-6
       font-bold text-xl h-full"
      >
        <FaBullseye className="pr-2 text-amber-300" size={"2rem"} />{" "}
        <Link to="/">BLOGGIES</Link>
      </h2>

      <div className="rounded-full flexcentered bg-amber-300 border shadow-md h-full">
        {!isAuth ? (
          <>
            <Link
              to="login"
              className="text-xs min-[380px]:p-2 min-[380px]:text-sm md:text-xl whitespace-nowrap flexcentered rounded-l-full px-3 h-full bg-amber-200 p-2"
            >
              Log In
            </Link>
            <Link
              to="register"
              className="text-xs min-[380px]:p-2 min-[380px]:text-sm md:text-xl font-semibold whitespace-nowrap flexcentered rounded-r-full px-3 h-full p-2"
            >
              Create Account
            </Link>
          </>
        ) : (
          <>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-xs min-[380px]:text-sm min-[380px]:p-2 md:text-xl whitespace-nowrap flexcentered rounded-l-full px-2 h-full bg-amber-200 p-1"
            >
              Log Out
            </div>
            <Link
              to={"/createpost"}
              className="text-xs min-[380px]:p-2 min-[380px]:text-sm md:text-xl font-semibold whitespace-nowrap flexcentered rounded-r-full px-2 h-full p-1"
            >
              Create Post
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
