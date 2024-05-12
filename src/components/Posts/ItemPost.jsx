import React from 'react'

function ItemPost() {
  return (
    <article className="post">
        <div className="post-media">
          <a href="single.html">
            <img src="assets/images/blog/home/post-1.jpg" alt="Post" width={225} height={280} />
          </a>
          <div className="post-date">
            <span className="day">26</span>
            <span className="month">Feb</span>
          </div>
        </div>
        {/* End .post-media */}
        <div className="post-body">
          <h2 className="post-title">
            <a href="single.html">Top New Collection</a>
          </h2>
          <div className="post-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
          </div>
          {/* End .post-content */}
          <a href="single.html" className="post-comment">0 Comments</a>
        </div>
        {/* End .post-body */}
      </article>
  )
}

export default ItemPost