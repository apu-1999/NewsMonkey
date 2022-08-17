import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : "general",
    totalResults : 0
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
    totalResults : PropTypes.number
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a67c428f2e3e4fcea666b7cdf58457a4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    console.log("Previous button clicked!");
    this.setState({
      page : this.state.page - 1
    })
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next button clicked!");
    this.setState({
      page : this.state.page + 1
    })
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading : false
    })
};

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading  && <Spinner />}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length < this.state.totalResults} loader={<Spinner/>}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
}

export default News;
