import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
const apiKey = '170881a27ea24e7580c10d4638ccd154';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = 'https://newsapi.org/v2/everything?q=bitcoin&sortBy=popularity&' +
                    `apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false); // End loading state after fetching
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
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