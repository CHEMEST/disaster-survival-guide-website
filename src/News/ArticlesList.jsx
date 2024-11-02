// ArticlesList.js
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticlesList = ({ articles }) => {
  //in case there are no articles
  if (!articles || articles.length === 0) {
    return <p className="text-center text-secondary">No articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article, index) => (
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
