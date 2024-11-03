import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState } from "react";
import News from './News/News.jsx';
import Location from './Location/Location.jsx';
import Skills from './skillsScreen/Skills.jsx';
import { switchSlides } from './skillsScreen/script.js';


function App() {
  const [activeId, setActiveId] = useState(0);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      
      

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        <div id="navbar">
          <TopNavbar activeId={activeId} setActiveId={setActiveId} switchSlides={switchSlides} />
        </div>
        <Skills />
        {/* <Location />
        <News /> */}
      </div>
    </div>
  );
}

export default App;
