import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 

const News = (props)=> {
  
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
  //document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a67c428f2e3e4fcea666b7cdf58457a4&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  },[]);
  
  const handlePreviousClick = async () => {
    console.log("Previous button clicked!");
    setPage(page-1);
    updateNews();
  };

  const handleNextClick = async () => {
    console.log("Next button clicked!");
    setPage(page+1);
    updateNews();
  };

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
};

    return (
      <>
        <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading  && <Spinner />}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={<Spinner/>}>
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author} 
                      date={element.publishedAt} 
                      sourceName = {element.source.name}
                    />
                  </div>
                );
              })}  
            </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  
}

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : "general",
  totalResults : 0
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
  totalResults : PropTypes.number
}

export default News;
