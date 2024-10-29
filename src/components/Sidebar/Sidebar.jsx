import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="hidden sm:flex min-h-screen flex-col justify-between bg-black text-white p-6 border-r-2 border-r-gray-900">
      {/* top part */}
      <div>
      
        <IoReorderThreeOutline onClick={() => setExtended((prev) => !prev)}
          className=" cursor-pointer w-10  h-10 p-1 shadow-md shadow-gray-600 rounded-xl hover:scale-105 delay-130 transition-all ease-in-out" />
        <div className="mt-12 flex items-center gap-2 p-2.5 bg-black rounded-full text-white text-sm cursor-pointer shadow-md shadow-gray-600 " onClick={() => newChat()}>
        <HiOutlinePlus className="w-5 text-xl"/>
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="flex flex-col">
            <p className="mt-8 mb-5">Recent</p>
            <hr  className="w-full p-2"/>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 pr-10 rounded-full cursor-pointer text-white  delay-120 transition-all ease-in-out shadow-md shadow-gray-600 m-2 hover:scale-105"
                onClick={() => loadPrompt(item)}
              >
                <img
                  src={assets.message_icon}
                  alt="Message Icon"
                  className="w-5"
                />
                <p>{item.slice(0, 10)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* bottom part */}
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex items-center gap-2 p-2 pr-10 rounded-full cursor-pointer transition-all delay-130 ease-in-out shadow-sm shadow-gray-600">
        <IoHelpCircleOutline className="w-5" />
  
          {extended && <p>Help</p>}
        </div>

        <div className="flex items-center gap-2 p-2 pr-10 rounded-full cursor-pointer transition-all delay-130 ease-in-out shadow-sm shadow-gray-600">
        <FaHistory  className="w-5"/>
        {extended && <p>Activity</p>}
        </div>

        <div className="flex items-center gap-2 p-2 pr-10 rounded-full cursor-pointer transition-all delay-130 ease-in-out shadow-sm shadow-gray-600">
        <IoSettingsOutline className="w-5" />
    
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
