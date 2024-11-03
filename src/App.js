import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState } from "react";
import News from './News/News.jsx';
import Location from './Location/Location.jsx';
import Skills from './skillsScreen/Skills.jsx';

function App() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      
      

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        {/* <div id="navbar">
          <TopNavbar activeId={activeId} setActiveId={setActiveId} />
        </div> */}
        <Skills />
        {/* <Location />
        <News /> */}
      </div>
    </div>
  );
}

export default App;
