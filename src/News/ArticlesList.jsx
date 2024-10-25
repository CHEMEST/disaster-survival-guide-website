// ArticlesList.jsx
import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticlesList';

const ArticlesList = ({ articles = [] }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Your data fetching logic goes here
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            articleUrl={article.url}
            source={article.source.name}
            publishedAt={article.publishedAt}
          />
        ))
      )}
    </div>
  );
};

export default ArticlesList;
