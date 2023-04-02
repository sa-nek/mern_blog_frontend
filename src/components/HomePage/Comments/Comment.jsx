import { FaUserCircle } from "react-icons/fa";

const Comment = () => {
  return (
    <div className="flexcentered justify-start w-full gap-2 border-b py-2">
      <FaUserCircle size={"3em"} className="p-1 text-amber-300" />
      <div>
        <h3>Username</h3>
        <h4 className="text-sm text-slate-500">Test comment</h4>
      </div>
    </div>
  );
};

export default Comment;
