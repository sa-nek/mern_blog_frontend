import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister, isAuthSelector } from "../../store/slices/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    const promise = await dispatch(fetchRegister(data));
    if ("token" in promise.payload) {
      localStorage.setItem("token", promise.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flexcentered flex-grow h-full w-full bg-gradient-to-b from-amber-50">
      <div className="w-11/12 flexcentered flex-col bg-white border shadow-md rounded-3xl md:w-3/5">
        <h2 className="text-2xl p-4">Register</h2>
        <FaUserCircle className="py-2 text-slate-400" size={"10rem"} />
        <form
          className="flex flex-col w-full px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flexcentered flex-col rounded-full">
            <input
              className={`${
                errors.fullName ? "border-red-400 border-2" : ""
              } h-14 w-full rounded-t-full px-10 py-2 border`}
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Please enter a name",
                minLength: 4,
              })}
            />
            <input
              className={`${
                errors.email ? "border-red-400 border-2" : ""
              } h-14 w-full rounded-sm px-10 py-2 border`}
              type="email"
              placeholder="email@email.com"
              {...register("email", { required: "Please enter an email" })}
            />
            <input
              className={`${
                errors.password ? "border-red-400 border-2" : ""
              } h-14 w-full rounded-b-full px-10 py-2 border`}
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Please enter the password",
                minLength: 6,
              })}
            />
          </div>
          <div className="flex justify-center py-3">
            <button
              disabled={!isValid}
              className="flexcentered border shadow-md w-40 text-2xl h-14 bg-amber-300 hover:bg-amber-200 rounded-full"
            >
              <div className="h-full flexcentered">Register</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
