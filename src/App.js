import './App.css';
import TopNavbar from "./TopNavbar.jsx";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Guide from './Guide.jsx';

function App() {
  const [activeId, setActiveId] = useState(1); // Home is initially active

  return (
    <div>
      <Router>
        <TopNavbar activeId={activeId} setActiveId={setActiveId}/>
        <Routes>
          <Route path="/" element={<Home setActiveId={setActiveId}/>} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
