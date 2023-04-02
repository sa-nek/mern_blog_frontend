import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="flexcentered flex-col w-full p-3 gap-2 items-start border rounded-md bg-white shadow-md hidden">
      <span className="text-xl">Comments</span>
      <div className="w-full">
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
