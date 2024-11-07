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

const mouseInfo = {
  x: 0,
  y: 0,
}

export function isAnimationRunning(){return scrollInfo.isRunning;}

//Initializes all basic info
//selects the scroll location upon loading
export default function Initialize(){
  console.log("js works");
  // initializeSliding();
  // initializeTimeline();
  // initializeNavs();
  initializeScroll();
  initializeContentSizing();
  initializeMouse();
}

function initializeMouse(){
  const parent = window.document.getElementById("historyContent");
  parent.addEventListener("mousemove", function(e){
    mouseInfo.x = e.clientX;
    mouseInfo.y = e.clientY;
    // console.log(mouseInfo);
  });
}

function initializeContentSizing(){
  const parent = window.document.getElementById("historyContent");
  const update = function(){
    // const nav = window.document.getElementById("navbar");
    window.document.querySelector(":root").style.setProperty("--screenHeight", `${window.innerHeight - parent.getBoundingClientRect().top}px`);
  }
  update();
  window.onresize = update;
}

function initializeScroll() {
  console.log("initialized");

  const parent = window.document.getElementById("historyContent");

  // parent.addEventListener("scroll", function(event){
  //   const checkFor = ["list"];
  //   checkFor.map(function(entry){return window.document.getElementById(entry);}).forEach(function(entry){
  //     const rect = entry.getBoundingClientRect();
  //     if(mouseInfo.x > rect.left && mouseInfo.x < rect.right && mouseInfo.y > rect.top && mouseInfo.y < rect.bottom){
  //       parent.style.overflow = "hidden";
  //       // parent.stopScroll();
  //       window.document.getElementById("news").scrollIntoView();
  //       console.log(rect);
  //       console.log(mouseInfo);
  //       return;
  //     }else{
  //       parent.style.overflow = "scroll";
  //       console.log("going");
  //     }
  //   });
  // });

  const children = window.document.querySelectorAll("#historyContent .slide");
  const observer = new IntersectionObserver(function(entries){
    // console.log(entries);
    // for(let i = 0; i < entries.length; i++){
    //   const entry = entries[i];
    //   console.log(i);
    //   console.log(entry);
    //   if(entry.isIntersecting || scrollInfo.isRunning){continue;}
    //   switchSlides(()=>{return i;})
    // }
    entries.forEach(function(entry){
      // console.log("ran");
      if(!entry.isIntersecting || scrollInfo.isRunning){return;}
      // console.log("scrolling");
      for(let i = 0; i < children.length; i++){
        if(children[i] === entry){
          scrollInfo.loc = i;
          console.log(scrollInfo.loc);
        }
      }
      
      entry.target.scrollIntoView();
    });
  }, {
    root: parent,
    threshold: 0.4,
  });
  children.forEach(function(entry){observer.observe(entry);});

  // const children = window.document.querySelectorAll("#historyContent .slideContent");
  // children.forEach(function(child){
  //   child.style.border = "2px solid red";
  //   child.addEventListener("scroll", function(){
  //     console.log("help me again ples");
  //   });
  // });

  // const content = window.document.getElementById("historyContent");
  // let lastScrollTop = content.scrollTop; // Start with the current scroll position
  // console.log("help me");
  // content.addEventListener("scroll", () => {
  //   console.log("scrolled");
  //   const scrollTop = content.scrollTop; // Get the current vertical scroll position
  //   if(scrollInfo.isRunning){
  //     lastScrollTop = scrollTop; // Update last scroll position
  //     return;
  //   }

    

  //   if (scrollTop > lastScrollTop && scrollInfo.loc < scrollInfo.numSlides - 1) {
  //     // Detect downward scroll and trigger slide change
  //     switchSlides(current => current + 1);
  //   } else if (scrollTop < lastScrollTop && scrollInfo.loc > 0) {
  //     // Detect upward scroll and trigger slide change
  //     switchSlides(current => current - 1);
  //   }

  //   lastScrollTop = scrollTop; // Update last scroll position
  // });
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

export async function switchSlides(newScrollLocationFunction){
  
  if(scrollInfo.isRunning){return false;}
  const newLoc = newScrollLocationFunction(scrollInfo.loc);
  const parent = window.document.getElementById("historyContent");
  // parent.style.overflow = "hidden";
  
  // if(newLoc === scrollInfo.loc || newLoc < 0 || newLoc >= scrollInfo.numSlides){return;}
  scrollInfo.isRunning = true;
  const children = window.document.querySelectorAll("#historyContent .slide");  
// parent.
  children.item(newLoc).scrollIntoView();
  console.log("start");
  await new Promise(function(accept){
    let resetFunc;
    const endFunc = function(){
      accept();
      console.log("end");
      parent.removeEventListener("scroll", resetFunc);
    }
    let timeout = setTimeout(endFunc, 100);
    resetFunc = function(){
      window.clearTimeout(timeout);
      timeout = setTimeout(endFunc, 100);
    }
    parent.addEventListener("scroll", resetFunc);
  });

  // // if(true){
  // //   changeNavigationElementVisibility(true);
  // //   await Promise.all([runSlideAnimation(newLoc)]);
  // // }else{
  // //   scrollInfo.loc = newLoc;
  // //   window.document.getElementById("historyContent").style.setProperty("--scrollLocation", `${scrollInfo.loc}`);
  // // }
  // parent.scrollTop = children.item(newLoc).getBoundingClientRect().top;
  // // parent.scrollTop = 0;

  scrollInfo.isRunning = false;
  // parent.overflow = "scroll";
  scrollInfo.loc = newLoc;
  // changeNavigationElementVisibility(false);
  return true;
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