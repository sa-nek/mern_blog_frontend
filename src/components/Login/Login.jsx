import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchLogin, isAuthSelector } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthSelector);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    const promise = await dispatch(fetchLogin(data));
    if ("token" in promise.payload) {
      localStorage.setItem("token", promise.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flexcentered flex-grow h-full w-full bg-gradient-to-b from-amber-50">
      <div className="w-11/12 flexcentered flex-col bg-white border shadow-md rounded-3xl md:w-2/5">
        <h2 className="text-2xl p-4">Login</h2>
        <form
          className="flex flex-col w-full px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flexcentered flex-col border rounded-full">
            <input
              className={`${
                errors.email ? "border-red-400 border-2" : ""
              } h-14 w-full rounded-t-full px-10 py-2 border-b`}
              type="email"
              placeholder={errors.email?.message || `email@email.com`}
              {...register("email", { required: "Please enter an email" })}
            />
            <input
              className={`${
                errors.password
                  ? "border-red-400 border-2 placeholder:text-red"
                  : ""
              } h-14 w-full rounded-b-full px-10 py-2`}
              type="password"
              placeholder={errors.password?.message || `password`}
              {...register("password", {
                required: "Please enter the password",
                minLength: 6,
              })}
            />
          </div>
          <div className="flex justify-center py-3">
            <button
              disabled={!isValid}
              className="flexcentered border w-40 text-2xl h-14 rounded-full"
            >
              <div className="bg-amber-300 hover:bg-amber-200 h-full w-1/2 rounded-l-full flexcentered justify-end pr-1">
                Log
              </div>
              <div className="bg-amber-300 hover:bg-amber-200 h-full w-1/2 rounded-r-full flexcentered justify-start pl-1">
                In
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
