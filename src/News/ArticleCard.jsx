// ArticleCard.jsx
import React from 'react';

const ArticleCard = ({ title, description, imageUrl, articleUrl, source, publishedAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Cover Image */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      )}

      {/* Article Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          {/* Source & Date */}
          <span className="text-xs text-gray-500">{source}</span>
          <span className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        {/* Link to the Article */}
        <a 
          href={articleUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 mt-4 block hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
