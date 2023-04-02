import { FaHashtag } from "react-icons/fa";

const Tag = ({ text }) => {
  return (
    <div className="pl-2 flex gap-3 p-2 border-b">
      <FaHashtag size={"1.5em"} className="text-neutral-500" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Tag;
