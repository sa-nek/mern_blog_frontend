import { useState } from "react";
import Comments from "./Comments/Comments";
import Posts from "./Posts/Posts";
import Tags from "./Tags/Tags";

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const toggletab = (index) => {
    setTabIndex(index);
  };
  return (
    <div className="pb-6 h-screen">
      <div className="flex items-center md:items-start justify-evenly md:flex-row flex-col bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="flexcentered flex-col w-10/12 md:w-5/12">
          <div className="flexcentered h-24 w-full">
            <div className="flex gap-4 bg-white rounded-xl px-6 py-3 shadow-md">
              <div
                className="flexcentered text-xs min-[380px]:text-sm md:text-xl whitespace-nowrap py-1 px-4 border-amber-200 border-b-4"
                onClick={() => {
                  toggletab(0);
                }}
              >
                New
              </div>
              <div
                className="flexcentered text-xs min-[380px]:text-sm md:text-xl whitespace-nowrap py-1 px-4 border-amber-300 border-b-4"
                onClick={() => {
                  toggletab(1);
                }}
              >
                Popular
              </div>
            </div>
          </div>
          <Posts />
        </div>
        <div className="flexcentered flex-col w-10/12 md:w-3/12 h-full pt-8 md:pt-[6.37rem] gap-10 pb-5">
          <Tags />
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Home;
