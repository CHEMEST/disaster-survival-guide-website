// ArticleCard.js
import React from 'react';

const ArticleCard = ({ title, description, url, urlToImage, author, publishedAt }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 border border-gray-200"
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
    </a>
  );
};

export default ArticleCard;
