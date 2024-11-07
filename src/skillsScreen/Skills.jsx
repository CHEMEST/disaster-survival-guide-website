import React, { useEffect } from 'react';
import Initialize, {switchSlides} from "./script.js";
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
    <div id="historyContent" onLoad={Initialize}>
      <div className="slide" data-num="Title">
        <div id="titleSlide" className="slideContent">
          <h1>BlazeHub!!!</h1>
          <button onClick={()=>{switchSlides(()=>{return 1;})}}>Go To Next</button>
        </div>
      </div>

      {/* <div id="scrollingSection"> */}
      {/* <FloatingDots/> */}
      {/* <div id="timeline">
      </div> */}
      {/* Slide 1 */}
      <div className="slide" data-num="Discovery of Fire">
        <div className="slideContent">
          <h1>The Origins of Fire Safety</h1>
          <div className="nativeContent">
            <img src={prehistoric} alt="prehistoricFire"/>
            <p>
              Fire was discovered 125k years ago.
              It helped early humans cook, make advanced tools, and more!
              Fire helped result in the formation of early base camps, in turn resulting in the formation of early civilizations.
            </p>
          </div>
        </div>
      </div>
      {/* Slide 2 */}
      <div className="slide" data-num="Fire's Destruction">
        <div className="slideContent">
          <h1>Destruction</h1>
          <div className="nativeContent">
            <img src={chicagoFire} alt="chicagoFire"/>
            <p>
              Fire has caused much damage to cities and urban sprawl, destroying many buildings and killing many.
              One example of this was the Great Chicago Fire of 1872, which razed Chicago to the ground and killed 300. 
            </p>
          </div>
        </div>
      </div>
      {/* Slide 3 */}
      <div className="slide" data-num="Fire's Destruction">
        <div className="slideContent">
          <h1>Fire Safety Today and Beyond</h1>
          <div className="nativeContent">
            <img src={fireSafety} alt="fireSaftyEquipment"/>
            <p>
              However, thanks to the creation of new inventions, such as fire escapes, fire hydrants, fire engines, and more, fires are prevented before they occur!
              This is our goal: to add to the list of creations and help prevent fires before they occur.
            </p>
          </div>
        </div>
      </div>

      <div className="slide" data-num="Location">
        <div className="slideContent">
          <h1>Map</h1>
          <Location/>
        </div>
      </div>

      <div className="slide" data-num="News">
        <div id="news" className="slideContent">
          <News/>
        </div>
      </div>

      <div className="slide" data-num="About Us">
        <div className="slideContent">
          <h1>About Us</h1>
          
        </div>
      </div>

      <button type="button" id="moveLeftButton">Left</button>
      <button type="button" id="moveRightButton">Right</button>
      <div id="dropDownMenu">
        <h3 id="dropDownMenuTitle">Menu</h3>
        <div id="dropDownMenuContent">
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
