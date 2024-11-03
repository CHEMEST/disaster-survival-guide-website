//Holds basic information about the state of this section
//loc: represents the index of the div currently being viewed
//isRunning: represents if the program is in the process of transitioning between different slides
//time: specifies the length of the animation

const scrollInfo = {
  loc: 0,
  isRunning: false,
  numSlides: 0,
  time: 2000,
}

//Initializes all basic info
//selects the scroll location upon loading
export default function Initialize(){
  console.log("js works");
  initializeSliding();
  // initializeTimeline();
  initializeNavs();
  initializeScroll();
}

function initializeScroll() {
  const content = window.document.getElementById("historyContent");
  let lastScrollTop = content.scrollTop; // Start with the current scroll position

  content.addEventListener("scroll", () => {
    

    const scrollTop = content.scrollTop; // Get the current vertical scroll position

    if (scrollTop > lastScrollTop && scrollInfo.loc < scrollInfo.numSlides - 1) {
      // Detect downward scroll and trigger slide change
      switchSlides(current => current + 1);
    } else if (scrollTop < lastScrollTop && scrollInfo.loc > 0) {
      // Detect upward scroll and trigger slide change
      switchSlides(current => current - 1);
    }

    lastScrollTop = scrollTop; // Update last scroll position
  });
}




//Adds children to the timeline, and assigns the correct offset 
function initializeTimeline(){
  const contentChildren = window.document.querySelectorAll("#historyContent .slide");
  const timelineParent = window.document.getElementById("timeline");
  for(let i = 0; i < contentChildren.length; i++){
    const element = window.document.createElement("div");
    const content = window.document.createElement("h3");
    content.innerHTML = contentChildren[i].dataset.num;
    element.appendChild(content);
    element.classList.add("timelineChildren");
    element.style.setProperty("--offset", `${i}`);
    timelineParent.appendChild(element);
  }
}

//Initializes all nav options
function initializeNavs(){
  initializeDropDown();
  initializeSideButtons();
}

function initializeSideButtons(){
  const leftButton = window.document.getElementById("moveLeftButton");
  const rightButton = window.document.getElementById("moveRightButton");
  leftButton.style.opacity = "0";
  leftButton.addEventListener("click", function(){
    if(scrollInfo.isRunning){return;}
    if(scrollInfo.loc === 0){return;}
    switchSlides((current)=>{return current-1;});
  });
  rightButton.addEventListener("click", function(){
    if(scrollInfo.isRunning){return;}
    if(scrollInfo.loc === scrollInfo.numSlides-1){return;}
    switchSlides((current)=>{return current+1});
  });
  leftButton.addEventListener("animationDone", function(){
    console.log(scrollInfo.loc + "," + scrollInfo.numSlides);
    leftButton.style.opacity = "1";
    if(scrollInfo.loc === 0){
       leftButton.classList.add("hideNav");
    }
  });
  rightButton.addEventListener("animationDone", function(){
    if(scrollInfo.loc === scrollInfo.numSlides-1){
       rightButton.classList.add("hideNav");
    }
  });
}


//Initializes the drop down menus and sets the correct styles
// also initializes the animations
function initializeDropDown(){
  const contentChildren = window.document.querySelectorAll("#historyContent .slide");
  const parent = window.document.getElementById("dropDownMenuContent");
  const marginSize = 10, childHeight = 25;
  const dropDownTitle = window.document.getElementById("dropDownMenuTitle");
  dropDownTitle.addEventListener("mouseover", function(){
    if(scrollInfo.isRunning){return;}
    parent.style.height = `${contentChildren.length * (childHeight + marginSize) + marginSize}px`;
  });
  parent.addEventListener("mouseover", function(){
    if(scrollInfo.isRunning){return;}
    parent.style.height = `${contentChildren.length * (childHeight + marginSize) + marginSize}px`;
  });
  dropDownTitle.addEventListener("mouseout", function(){
    parent.style.height = "0px";
  });
  parent.addEventListener("mouseout", function(){
    parent.style.height = "0px";
  });
  for(let i = 0; i < contentChildren.length; i++){
    const element = window.document.createElement("h3");
    element.style.height = `${childHeight}px`;
    element.style.marginTop = `${marginSize}px`;
    element.style.marginBottom = `${marginSize}px`;
    element.innerHTML = contentChildren[i].dataset.num;
    element.addEventListener("click", function(){
      if(scrollInfo.isRunning){return;}
      if(scrollInfo.loc === i){return;}
      switchSlides((current)=>{return i;});
    });
    parent.appendChild(element);
  }
}

//Gets ready the sliding program
function initializeSliding(){
  const parent = window.document.getElementById("historyContent");
  parent.style.setProperty("--scrollLocation", `${scrollInfo.loc}`);
  const children = window.document.querySelectorAll("#historyContent .slide");
  for(let i = 0; i < children.length; i++){
    children[i].style.setProperty("--offset", `${i}`);
  }
  scrollInfo.numSlides = children.length;

}

//Handles requests to switch to a certain slide in javascript
//parameter: Takes in a function that calculates the new slide to transition to, with the current location as a parameter
//Prevents multiple "switchSlide" functions from being called on top of each other in order to prevent animation bugs

async function switchSlides(newScrollLocationFunction){
  if(scrollInfo.isRunning){return;}
  scrollInfo.isRunning = true;
  if(true){
    changeNavigationElementVisibility(true);
    await Promise.all([runSlideAnimation(newScrollLocationFunction(scrollInfo.loc))]);
  }else{
    scrollInfo.loc = newScrollLocationFunction(scrollInfo.loc);
    window.document.getElementById("historyContent").style.setProperty("--scrollLocation", `${scrollInfo.loc}`);
  }
  console.log("finished");
  scrollInfo.isRunning = false;
  changeNavigationElementVisibility(false);
}

//changes the nav elements based on the initial parameter
function changeNavigationElementVisibility(playing){
  ["dropDownMenu", "moveLeftButton", "moveRightButton"].map(function(entry){return window.document.getElementById(entry);}).forEach(function(element){
    if(playing){element.classList.add("hideNav");}
    else{
      element.classList.remove("hideNav");
      element.dispatchEvent(new Event("animationDone"));
    }
  });
}

//Actually performs the animations for the slides

async function runSlideAnimation(newLoc){
  const switchAnimation = window.document.getElementById("historyContent").animate(
    [
      {
        offset: 0,
        easing: "ease",
        "--globalScale": "1",
        "--scrollLocation": `${scrollInfo.loc}`,
      },
      {
        offset: 0.2,
        easing: "ease",
        "--globalScale": "0.7",
        "--scrollLocation": `${scrollInfo.loc}`,
      },
      {
        offset: 0.8,
        easing: "ease",
        "--globalScale": "0.7",
        "--scrollLocation": `${newLoc}`,
      },
      {
        offset: 1,
        easing: "ease",
        "--globalScale": "1",
        "--scrollLocation": `${newLoc}`,
      },
    ], scrollInfo.time);
  switchAnimation.finished.then(function(){
    scrollInfo.loc = newLoc;
    window.document.getElementById("historyContent").style.setProperty("--scrollLocation", `${scrollInfo.loc}`);
  });
  return switchAnimation.finished;
}

//Animates the timeline
async function runTimelineTransition(){
  const timelineAnimation = window.document.getElementById("timeline").animate([
    {
      offset: 0,
      easing: "ease",
      "transform": "scale(0.4, 0.2)",
      "top": "0%",
      "borderRadius": "0 0 10px 10px",
    },
    {
      offset: 0.2,
      easing: "ease",
      "transform": "scale(1)",
      "top": "35%",
      "borderRadius": "10px",
    },
    {
      offset: 0.8,
      easing: "ease",
      "transform": "scale(1)",
      "top": "35%",
      "borderRadius": "10px",
    },
    {
      offset: 1,
      easing: "ease",
      "transform": "scale(0.4, 0.2)",
      "top": "0%",
      "borderRadius": "0 0 10px 10px",
    },
  ], scrollInfo.time);
  return timelineAnimation.finished;
}