import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
const apiKey = '170881a27ea24e7580c10d4638ccd154';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
      const fetchArticles = async () => {
        try {
          console.log(`API Key: ${apiKey}`);
          var url = 'https://newsapi.org/v2/everything?' +
          'sortBy=popularity&' +
          `apiKey=${apiKey}`;

          var req = new Request(url);

          fetch(req)
              .then(function(response) {
                  const data = response.json();
                  console.log('API Response:', data);
                  setArticles(data.articles);
              })
          // Ensure the data is an array
           // Default to an empty array if no articles
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