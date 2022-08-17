import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, sourceName} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{sourceName} </span> 
            <img src={imageUrl?imageUrl:"https://www.deccanherald.com/sites/dh/files/articleimages/2022/08/16/asteroid-1-1-1136502-1660627156.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
