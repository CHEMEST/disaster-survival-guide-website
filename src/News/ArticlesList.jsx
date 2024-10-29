// ArticlesList.js
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticlesList = ({ articles }) => {
  //filtering
  const filteredArticles = articles.filter(
    (article) => article.title !== "[Removed]"
  );
  //in case there are no articles
  if (!filteredArticles || filteredArticles.length === 0) {
    return <p className="text-center text-gray-500">No articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredArticles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          description={article.description}
          url={article.url}
          urlToImage={article.urlToImage}
          author={article.author}
          publishedAt={article.publishedAt}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
