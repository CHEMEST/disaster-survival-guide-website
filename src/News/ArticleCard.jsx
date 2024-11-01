import React, { useState } from 'react';

const ArticleCard = ({ title, description, url, urlToImage, author, publishedAt }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    // animating
    setTimeout(() => {
      window.location.href = url;
    }, 400); // Slightly shorter than in config
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out border border-gray-200 cursor-pointer ${
        isAnimating ? 'animate-expand' : 'hover:shadow-lg'
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      </div>
      {urlToImage && (
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${urlToImage})` }} />
      )}
      <div className="p-4">
        <p className="text-gray-700 mb-2">{description}</p>
        <div className="text-gray-500 text-sm">
          <p>By: {author || 'Unknown'}</p>
          <p>Published: {new Date(publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;