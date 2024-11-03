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
      <div className="slide" data-num="Discovery of Fire">
        <div className="slideContent">
          <h1>Discovery of Fire</h1>
          <div>
            <p>
              Fire was discovered 125k years ago.
              It helped early humans cook, make advanced tools, and more!
              Fire helped result in the formation of early base camps, in turn resulting in the formation of early civilizations.
            </p>
            <img src={prehistoric}/>
          </div>
        </div>
      </div>
      <div className="slide" data-num="Fire Destruction">
        <div className="slideContent">
          <h1>Fire Destruction</h1>
          <div>
            <p>
              Fire has caused much damage to cities and urban sprawl, destroying many buildings and killing many.
              One example of this was the Great Chicago Fire of 1872, which razed Chicago to the ground and killed 300.
            </p>
            <img src={chicagoFire}/>
          </div>
        </div>
      </div>
      <div className="slide" data-num="Modern Technology">
        <div className="slideContent">
          <h1>Modern Fire Technology</h1>
          <div>
            <p>
              However, thanks to the creation of new inventions, such as fire escapes, fire hydrants, fire engines, and more, fires are prevented before they occur!
              This is our goal: to add to the list of creations and help prevent fires before they occur.
            </p>
            <img src={fireSafety}/>
          </div>
        </div>
      </div>
      <div className="slide" data-num="Map">
        <div className="slideContent">
          <h1>News</h1>
          <div><News/></div>
        </div>
      </div>
      <div className="slide" data-num="Location">
        <div className="slideContent">
          <h1>Map Stuff</h1>
          <Location/>
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
