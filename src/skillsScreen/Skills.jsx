import React, { useEffect } from 'react';
import Initialize from "./script.js";
import "./style.css";
import prehistoric from "./prehistoric.jpg";
import fireSafety from "./fireSafety.jpg";
import chicagoFire from "./chicagoFire.jpg";
import Location from "../Location/Location.jsx";
import News from "../News/News.jsx";

const FloatingDots = () => {
  const numDots = 50; // Adjust the number of dots
  const dotsArray = Array.from({ length: numDots });

  return (
      <div className=" w-full h-full overflow-hidden -z-40">
          {dotsArray.map((_, index) => {
              const size = Math.floor(Math.random() * 4) + 2; // Random size for the dots
              const top = (Math.random() * 100); // Random top position
              const left = Math.random() * 100; // Random left position
              const delay = Math.random() * 10; // Random animation delay

              return (
                  <div
                      key={index}
                      className="absolute bg-white rounded-full opacity-75"
                      style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          top: `${top}%`,
                          left: `${left}%`,
                          animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                          animationDelay: `${delay}s`,
                      }}
                  ></div>
              );
          })}
      </div>
  );
};

export default function Skills({ setActiveId }) {
  useEffect(() => {
    Initialize(setActiveId); // Pass setActiveId to Initialize here
  }, [setActiveId]);

  return (
    <div id="historyContent" className="bg-background pt-16 overflow-hidden" onLoad={Initialize}>
      <div>
      <FloatingDots/>
      <div id="timeline">
      </div>
      {/* Slide 1 */}
      <div className="slide min-h-screen flex flex-col justify-center items-center" data-num="Discovery of Fire">
        <div className="slideContent flex flex-col items-center text-center w-full h-full">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center max-w-md mx-auto">
            <img src={prehistoric} alt="prehistoricFire" className="w-full max-w-md rounded-xl mb-4"/>
            <p className="text-lg">
              Fire was discovered 125k years ago.
              It helped early humans cook, make advanced tools, and more!
              Fire helped result in the formation of early base camps, in turn resulting in the formation of early civilizations.
            </p>
          </div>
        </div>
      </div>
      {/* Slide 2 */}
      <div className="slide min-h-screen flex flex-col justify-center items-center" data-num="Fire's Destruction">
        <div className="slideContent flex flex-col items-center text-center w-full h-full">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center max-w-md mx-auto">
            <img src={chicagoFire} alt="chicagoFire" className="w-full max-w-md rounded-xl mb-4"/>
            <p className="text-xl text-text">
              Fire has caused much damage to cities and urban sprawl, destroying many buildings and killing many.
              One example of this was the Great Chicago Fire of 1872, which razed Chicago to the ground and killed 300. 
            </p>
          </div>
        </div>
      </div>
      {/* Slide 3 */}
      <div className="slide min-h-screen flex flex-col justify-center items-center" data-num="Fire's Destruction">
        <div className="slideContent flex flex-col items-center text-center w-full h-full">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center max-w-md mx-auto">
            <img src={fireSafety} alt="fireSaftyEquipment" className="w-full max-w-md rounded-lg mb-4"/>
            <p className="text-xl text-text">
              However, thanks to the creation of new inventions, such as fire escapes, fire hydrants, fire engines, and more, fires are prevented before they occur!
              This is our goal: to add to the list of creations and help prevent fires before they occur.
            </p>
          </div>
        </div>
      </div>

      <div className="slide min-h-screen flex flex-col justify-center items-center" data-num="Location">
        <div className="slideContent w-full h-full flex justify-center items-center">
          <h1>Map</h1>
          <Location/>
        </div>
      </div>

      <div className="slide min-h-screen flex flex-col justify-center items-center" data-num="Map">
        <div className="slideContent w-full h-full flex justify-center items-center">
          <News/>
        </div>
      </div>

      <button type="button" id="moveLeftButton">Left</button>
      <button type="button" id="moveRightButton">Right</button>
      <div id="dropDownMenu">
        <h3 id="dropDownMenuTitle">Menu</h3>
        <div id="dropDownMenuContent">
        </div>
      </div>
      </div>
    </div>
  );
}
