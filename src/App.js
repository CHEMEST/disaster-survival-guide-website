import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import News from './News.jsx';
import Location from './Location.jsx';
import Skills from './skillsScreen/Skills.jsx';

function App() {
  const [activeId, setActiveId] = useState(1); // Home is initially active

  return (
    <div>
      <Router>
        <TopNavbar activeId={activeId} setActiveId={setActiveId}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/location" element={<Location />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
