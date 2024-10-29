import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import logo from "../../assets/logo/TitleLogo2.svg";
import mainLogo from "../../assets/logo/TitleLogo3.svg";
import { FaCode } from "react-icons/fa6";
import { AiOutlineCompass } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Main = () => {
  const {
    onSent,
    recentPrompts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    prevPrompts,
    setRecentPrompt,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const [displayedText, setDisplayedText] = useState("");
  const resultContainerRef = useRef(null);

  useEffect(() => {
    if (showResult && !loading && resultData) {
      setDisplayedText(""); // Reset displayed text
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < resultData.length) {
          const char = resultData[index];
          if (char !== undefined && char !== null) {
            setDisplayedText((prev) => prev + char);
          }
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 10); // Typing speed

      return () => clearInterval(intervalId);
    } else if (loading) {
      setDisplayedText(""); // Reset displayed text if loading
    }
  }, [showResult, loading, resultData]);

  useEffect(() => {
    // Scroll to bottom when displayedText updates
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop =
        resultContainerRef.current.scrollHeight;
    }
  }, [displayedText, loading]); // Trigger scroll on displayedText and loading changes

  const formatResultData = (text) => {
    return (
      text
        // Heading formatting
        .replace(/#\s*(.*?)\n/g, '<h2 class="text-3xl font-bold mb-4">$1</h2>')
        .replace(/##\s*(.*?)\n/g, '<h3 class="text-2xl font-bold mb-4">$1</h3>')
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Inline code (single backticks)
        .replace(
          /`([^`]+)`/g,
          '<code class=" text-red-600 px-1 py-0.5 rounded">$1</code>'
        )
        // Code blocks (triple backticks)
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-gray-800 text-green-300 p-4 rounded overflow-auto"><code>$1</code></pre>'
        )
        // Bullet points
        .replace(/\*\s(.*?)\n/g, '<li class="list-disc ml-6">$1</li>')
        // Line breaks for paragraphs
        .replace(/(?:\r\n|\r|\n){2,}/g, "<br><br>")
        .replace(/\n/g, "<br>")
    );
  };

  return (
    <div className="flex flex-col w-full justify-between p-10 bg-black text-white">
      {/* topbar */}

      <div className="flex items-center justify-between text-xl p-2 text-gray-600 ">
        <img src={mainLogo} className="w-28" alt="Main Logo" />
        <img
          src={assets.user_icon}
          alt="User Icon"
          className="w-10 rounded-full"
        />
      </div>

      {/* result */}

      <div className="sm:max-w-2xl md:max-w-4xl mx-auto">
        {!showResult ? (
          <>
            {/* <div className="sm:my-12 text-xl sm:text-5xl text-gray-400 font-medium p-5">
              <p className="mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-blue-600 to-red-500">
                  Hello, I'm Pictel
                </span>
              </p>
              <p>How can I Help You Today..</p>
            </div> */}

            <div className="sm:my-12 text-xl sm:text-5xl text-gray-400 font-medium p-5">
              <p className="mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-blue-500  to-pink-500 bg-[length:400%] animate-wave">
                  Hello, I'm Pictel
                </span>
              </p>
              <p>How can I Help You Today..</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-4 p-5">
              <div
                className="h-52 p-4 bg-black shadow-sm shadow-gray-600 rounded-lg relative cursor-pointer hover:bg-gray-600"
                onClick={() => loadPrompt("Briefly Explain Hooks in React Js")}
              >
                <p className="text-white text-lg">
                  Briefly Explain Hooks in React Js
                </p>
                <FaRegLightbulb className="w-10 h-10 p-1 bg-black rounded-full absolute bottom-2 right-2" />
              </div>
              <div
                className="h-52 p-4  bg-black shadow-sm shadow-gray-600 rounded-lg relative cursor-pointer hover:bg-gray-600"
                onClick={() => loadPrompt("Suggest Some Coding Tips")}
              >
                <p className="text-white text-lg">Suggest Some Coding Tips</p>

                <AiOutlineMessage className="w-10 h-10 p-1 bg-black rounded-full absolute bottom-2 right-2" />
              </div>
              <div
                className="h-52 p-4  bg-black shadow-sm shadow-gray-600 rounded-lg relative cursor-pointer hover:bg-gray-600"
                onClick={() =>
                  loadPrompt("Summarize This Concept: Urban Planning")
                }
              >
                <p className="text-white text-lg">
                  Summarize This Concept: Urban Planning
                </p>
                <AiOutlineCompass className="w-10 h-10 p-1 bg-black rounded-full absolute bottom-2 right-2" />
              </div>
              <div
                className="h-52 p-4  bg-black shadow-sm shadow-gray-600 rounded-lg relative cursor-pointer hover:bg-gray-600"
                onClick={() =>
                  loadPrompt("Improve Readability of the following Code")
                }
              >
                <p className="text-white text-lg">
                  Improve Readability of the following Code
                </p>
                <FaCode className="w-10 h-10 p-1 bg-black rounded-full absolute bottom-2 right-2" />
              </div>
            </div>
          </>
        ) : (
          <div
            className="result px-[5%] max-h-[70vh] overflow-y-auto"
            ref={resultContainerRef}
          >
            <div className="result-title my-10 flex items-center gap-5">
              <img
                src={assets.user_icon}
                alt="User Icon"
                className="w-10 h-10 rounded-full"
              />
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data flex items-start">
              <img
                src={logo}
                className="mr-2 w-10 h-10 rounded-full"
                alt="Logo"
              />
              {loading ? (
                <div className="w-full flex flex-col gap-2">
                  <div
                    className="h-5 rounded bg-gradient-to-r from-gray-600 via-white to-gray-600 bg-[length:800px_50px] animate-loader"
                    style={{ backgroundPosition: "-800px 0px" }}
                  ></div>
                  <div
                    className="h-5 rounded bg-gradient-to-r from-gray-600 via-white to-gray-600 bg-[length:800px_50px] animate-loader"
                    style={{ backgroundPosition: "-800px 0px" }}
                  ></div>
                  <div
                    className="h-5 rounded bg-gradient-to-r from-gray-600 via-white to-gray-600 bg-[length:800px_50px] animate-loader"
                    style={{ backgroundPosition: "-800px 0px" }}
                  ></div>
                </div>
              ) : (
                <div
                  className="overflow-auto  text-[17px] font-light leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatResultData(displayedText),
                  }}
                ></div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* search */}

      <div>
        <div className=" w-full sm:max-w-2xl md:max-w-4xl  px-5   mx-auto">
          <div className="flex items-center justify-between gap-5  bg-gray-100 p-3 rounded-full">
            <input
              type="text"
              placeholder="Enter Prompt here"
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg text-black"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
            />

            <div className="flex items-center gap-4">
              {input ? (
                <IoMdSend
                  onClick={() => onSent()}
                  className="w-6 h-6cursor-pointer text-black "
                />
              ) : null}
            </div>
          </div>
          <p className="text-center text-xs mt-4 mb-5 font-light">
            Pictel AI may display inaccurate info, including about people, so
            double-check its responses. All rights reserverd @Bhupesh Roushan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
