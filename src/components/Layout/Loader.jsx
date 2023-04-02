const PostLoader = ({ h }) => {
  return (
    <div
      className={`min-h-[20vw] flexcentered h-[${h}] border-2 border-gray-300 rounded-lg p-2 m-2 w-full animate-pulse shadow-md`}
    >
      <div className="animate-ping bg-slate-200  min-w-[15vw] min-h-[7vw] md:min-h-[10vw]"></div>
    </div>
  );
};

export default PostLoader;
