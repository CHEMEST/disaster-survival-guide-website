import ArticleCard from './ArticleCard';

const ArticlesList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className="text-center text-text-secondary">No articles available.</p>;
  }

  const handleScroll = (e) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div
      onWheel={handleScroll}
      className="flex overflow-x-auto space-x-4 py-4 px-2 no-scrollbar"
    >
      {articles.map((article, index) => (
        <div className="flex-none w-80">
          <ArticleCard
            key={index}
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
  );
};

export default ArticlesList;
