import ArticleCard from './ArticleCard';


let num = 0;

const ArticlesList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className="text-center text-text-secondary">No articles available.</p>;
  }

  const handleScroll = (e) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  // const parent = window.document.getElementById("list");

  const mouseOver = function(e){
    const parent = window.document.getElementById("list");
    const rect = parent.getBoundingClientRect();
    const x = e.clientX, y = e.clientY;
    if(y > rect.top && y < rect.bottom){
      if((x > rect.left && x < rect.left + rect.width * 0.1)){
        // parent.scrollLeft -= 10;
        // console.log("left");
        num = 1;
        return;
      }
      if((x<rect.right && x > rect.right - rect.width * 0.1)){
        // parent.scrollLeft += 10;
        // console.log("right");
        num = 2;
        return;
      }
    }
    num = 0;
  }

  setInterval(function(){
    const parent = window.document.getElementById("list");
    if(num === 1){
      parent.scrollLeft -= 10;
    }else if(num ===2){
      parent.scrollLeft += 10;
    }
  }, 100);

  return (
    <div>
      <div
        id="list"
        onWheel={handleScroll}
        onMouseMove = {mouseOver}
        onMouseLeave = {()=>{
          console.log("help me");
          num = 0;
        }}
        className="flex overflow-x-auto space-x-4 py-4 px-2 no-scrollbar border-solid "
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

    </div>
    
  );
};

export default ArticlesList;
