import React from 'react'
import appUrl from '../../api/appUrl'
import { Link } from 'react-router-dom';

function ItemPost({data}) {
  const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
};
  return (
    <article className="post">
        <div className="post-media">
          <Link to={"/bai-viet/"+data.slug}>
            <img src={appUrl.postUrl+data.imagePath} alt="Post" width={225} height={280} />
          </Link>
          <div className="post-date">
    <span className="day">{new Date(data.createdAt).getDate()}</span>
    <span className="month">Th{new Date(data.createdAt).getMonth()}</span>
</div>
        </div>
        {/* End .post-media */}
        <div className="post-body">
          <h2 className="post-title">
          <Link to={"/bai-viet/"+data.slug}>{truncateString(data.name,50)}</Link>
          </h2>
          <div className="post-content" style={{ maxHeight:"4em" }} dangerouslySetInnerHTML={{ __html:data.detail }}>
          </div>
          {/* End .post-content */}
          {/* <Link to={"/bai-viet/"+data.slug} className="post-comment">0 Comments</Link> */}
        </div>
        {/* End .post-body */}
      </article>
  )
}

export default ItemPost