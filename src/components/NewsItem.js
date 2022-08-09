import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description} = this.props;
    return (
      <div>
        <div class="card" style={{width: "18rem"}}>
            <img src="https://www.nationalreview.com/wp-content/uploads/2022/08/Donald-Trump-30.jpg?fit=2057%2C1200" className="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/newsdetail" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
