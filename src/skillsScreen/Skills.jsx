import React from 'react';
import Initialize from "./script.js";
import "./style.css";
import prehistoric from "./prehistoric.jpg";
import fireSafety from "./fireSafety.jpg";
import chicagoFire from "./chicagoFire.jpg";
import Location from "../Location/Location.jsx";
import News from "../News/News.jsx";


export default function Skills() {
  return (
    <div id="historyContent" onLoad={Initialize}>
      <div id="timeline">
      </div>
      {/* Slide 1 */}
      <div className="slide" data-num="Discovery of Fire">
        <div className="slideContent flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center mt-4 max-w-md mx-auto">
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
      <div className="slide" data-num="Fire's Destruction">
        <div className="slideContent flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center mt-4 max-w-md mx-auto">
            <img src={chicagoFire} alt="chicagoFire" className="w-full max-w-md rounded-xl mb-4"/>
            <p className="text-xl text-text">
              Fire has caused much damage to cities and urban sprawl, destroying many buildings and killing many.
              One example of this was the Great Chicago Fire of 1872, which razed Chicago to the ground and killed 300. 
            </p>
          </div>
        </div>
      </div>
      {/* Slide 3 */}
      <div className="slide" data-num="Fire's Destruction">
        <div className="slideContent flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-4">Discovery of Fire</h1>
          <div className="nativeContent flex flex-col items-center mt-4 max-w-md mx-auto">
            <img src={fireSafety} alt="fireSaftyEquipment" className="w-full max-w-md rounded-lg mb-4"/>
            <p className="text-xl text-text">
              However, thanks to the creation of new inventions, such as fire escapes, fire hydrants, fire engines, and more, fires are prevented before they occur!
              This is our goal: to add to the list of creations and help prevent fires before they occur.
            </p>
          </div>
        </div>
      </div>

      <div className="slide" data-num="Location">
        <div className="slideContent">
          <h1>Map Stuff</h1>
          <Location/>
        </div>
      </div>

      <div className="slide" data-num="Map">
        <div className="slideContent">
          <div><News/></div>
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
  );
}
