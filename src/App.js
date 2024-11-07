import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState, useEffect } from "react";
import News from './News/News.jsx';
import Location from './Location/Location.jsx';
import Skills from './skillsScreen/Skills.jsx';
import { switchSlides } from './skillsScreen/script.js';
import Initialize from './skillsScreen/script.js';


function App() {
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    Initialize(setActiveId); // Pass setActiveId to Initialize
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      
      <div id="navbar">
          <TopNavbar activeId={activeId} setActiveId={setActiveId} switchSlides={switchSlides} />
      </div>

      {/* Main Content */}
      {/* <div className="flex-grow overflow-hidden"> */}

        <Skills setActiveId={setActiveId}/>
        {/* <Location />
        <News /> */}
      {/* </div> */}
    </div>
  );
}

export default App;
