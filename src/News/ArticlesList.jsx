import ArticleCard from './ArticleCard';
import { useState, useEffect } from 'react';

let scrollDirection = 0;

const ArticlesList = ({ articles }) => {
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);

  // Set up the interval for scrolling
  useEffect(() => {
    const intervalId = setInterval(() => {
      const list = document.getElementById("list");
      if (list) { // Ensure list exists before scrolling
        if (scrollDirection === -1) {
          list.scrollLeft -= 3; // Adjust scroll step for smoothness
        } else if (scrollDirection === 1) {
          list.scrollLeft += 3;
        }
      }
    }, 3); // Adjust interval for smoothness

    // Cleanup function to clear the interval when scrollDirection changes or component unmounts
    return () => clearInterval(intervalId);
  }, [scrollDirection]); // Re-run effect when scrollDirection changes

  if (!articles || articles.length === 0) {
    return <p className="text-center text-text-secondary">No articles available.</p>;
  }

  const handleMouseMove = (e) => {
    const list = document.getElementById("list");
    const rect = list.getBoundingClientRect();
    const mouseX = e.clientX;

    // Determine if we should scroll and show gradients
    if (mouseX < rect.left + rect.width * 0.1) {
      scrollDirection = -1; // Scroll left
      setShowLeftGradient(true);
      setShowRightGradient(false);
    } else if (mouseX > rect.right - rect.width * 0.1) {
      scrollDirection = 1; // Scroll right
      setShowRightGradient(true);
      setShowLeftGradient(false);
    } else {
      scrollDirection = 0; // Stop scrolling
      setShowLeftGradient(false);
      setShowRightGradient(false);
    }
  };

  return (
    <div className="relative">
      <div
        id="list"
        onWheel={(e) => e.preventDefault()} // Disable wheel scroll
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          scrollDirection = 0; // Stop scrolling on mouse leave
          setShowLeftGradient(false);
          setShowRightGradient(false);
        }}
        className="flex overflow-x-auto space-x-4 py-4 px-2 no-scrollbar border-solid relative"
      >
        {articles.map((article, index) => (
          <div className="flex-none w-80" key={index}>
            <ArticleCard
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              author={article.author}
              publishedAt={article.publishedAt}
            />
          </div>
        ))}
      </div>

      {/* Left Gradient Overlay */}
      {showLeftGradient && (
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: '10%', // Covers 1/3 of the width
            background: 'linear-gradient(to right, black, transparent)', // Gradient from black to transparent
            pointerEvents: 'none', // Allows clicks to pass through
          }}
        ></div>
      )}

      {/* Right Gradient Overlay */}
      {showRightGradient && (
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: '10%', // Covers 1/3 of the width
            background: 'linear-gradient(to left, black, transparent)', // Gradient from black to transparent
            pointerEvents: 'none', // Allows clicks to pass through
          }}
        ></div>
      )}
    </div>
  );
};

export default ArticlesList;
