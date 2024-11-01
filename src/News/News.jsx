import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
      const fetchArticles = async () => {
        try {
          console.log('API Key:', apiKey);
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=technology&pageSize=100&apiKey=${apiKey}`
          );
          const data = await response.json();
          console.log('API Response:', data);
          // Ensure the data is an array
          setArticles(data.articles || []); // Default to an empty array if no articles
        } catch (error) {
          console.error('Error fetching articles:', error);
          setArticles([]); // Default to an empty array on error
        }
      };

      fetchArticles();
    }, []);

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
          <ArticlesList articles={articles} />
        </div>
      </div>
    );
  };
  
export default News;