import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState } from "react";
import News from './News/News.jsx';
import Location from './Location/Location.jsx';
import Skills from './skillsScreen/Skills.jsx';

function App() {
  const [activeId, setActiveId] = useState(1); // Home is initially active

  return (
    <div>
      <TopNavbar activeId={activeId} setActiveId={setActiveId}/>
      <Skills />
      <Location />
      <News />
    </div>
  );
}

export default App;
