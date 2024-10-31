import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
import HeadlineBar from './HeadLineBar';
const apiKey = '170881a27ea24e7580c10d4638ccd154';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = 'https://newsapi.org/v2/everything?' +
                    'q="wildfire" OR "forest fire" OR "fire disaster"&' +
                    'sortBy=popularity&' +
                    `apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        //filtering
        const filteredArticles = (data.articles || []).filter(article => article.title !== "[Removed]");
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false); // End loading state after fetching
      }
    };

    fetchArticles();
  }, []);
  const topArticles = articles.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeadlineBar articles={topArticles} />
      <div className="container mx-auto py-10">
        <h1 className="text-5xl font-bold text-center mb-10">Latest News</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : (
          <ArticlesList articles={articles} />
        )}
      </div>
    </div>
  );
};
export default News;