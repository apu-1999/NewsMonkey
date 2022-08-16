import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
 

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8
  }
  static propTypes = {
    country : PropTypes.string.isRequired,
    pageSize : PropTypes.number.isRequired
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a67c428f2e3e4fcea666b7cdf58457a4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    });
  }

  handlePreviousClick = async () => {
    console.log("Previous button clicked!");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a67c428f2e3e4fcea666b7cdf58457a4&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading : false
    });
  };

  handleNextClick = async () => {
    console.log("Next button clicked!");
    if (
      !(
        Math.ceil(this.state.totalResults / this.props.pageSize) <
        this.state.page + 1
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a67c428f2e3e4fcea666b7cdf58457a4&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading : false
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
