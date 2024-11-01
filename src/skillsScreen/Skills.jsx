import React from 'react';
import "./skillStyle.css";

function Skills() {
    return (
        <div>
            <p id="test">skills</p>
        </div>
    );
}

export default Skills;
import React from 'react';
import "./skillsScreen.css";
import "./introScreenStyle.css";
import "./skillsContent.css";

export default function Skills() {
  return (
    <div id="skillScreen">
      <div id="skillScreenIntro">
        <h1 id="skillsTitle">Skills and Knowledge</h1>
        <br/>
        <div id="introSkillsQuote">
          <i id="quoteContent">Knowledge is they key to survival, the real beauty of that is that is doesn't weigh anything.</i>
          <h6 id="quoteSource">-Ray Mears</h6>
        </div>
        <br/>
        <p>Knowledge is needed for self-reliance, which in turn is needed to survive... blah blah blah, here is some info!</p>
        <hr/>
      </div>
      <div id="skillsContent">
        <div id="skillsContentMenuBar">
          <h1>Skills and Info</h1>
          <button type="button">Plants and Wildlife</button>
        </div>
        <div id="skillsContentInformation">
        </div>
      </div>    		
    </div>
  );
}



function GeneratePlants(){

}