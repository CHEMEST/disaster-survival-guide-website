import React from 'react';

const HeadlineBar = ({ articles }) => {
  return (
    <div className="bg-secondary text-text pt-6 pb-4 px-4 shadow-md overflow-hidden sticky top-12 z-10">
      <div className="whitespace-nowrap flex animate-scroll">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-l font-semibold mx-4 hover:underline"
          >
            {article.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeadlineBar;
