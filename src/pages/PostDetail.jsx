import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postApi from "../api/postApi";
import { toast } from "react-toastify";
import { Avatar } from "primereact/avatar";
import appUrl from "../api/appUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ItemPost from "../components/Posts/ItemPost";
import FacebookComments from "../components/FacebookComments";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await postApi.getPostBySlug(slug);
        console.log(response);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {}
    };
    fecth();
  }, [slug]);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await postApi.getSame(slug);
        console.log("same", response);
        if (response.status === 200) {
          setPostData(response.data);
        }
      } catch (error) {}
    };
    fecth();
  }, [slug]);
  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Đã sao chép liên kết vào bộ nhớ tạm.");
      })
      .catch((err) => {
        console.error("Không thể copy link: ", err);
      });
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          <article className="post single">
            {/* {post.imagePath !== null && (
              <div
                className="post-media"
                style={{ width:"50%",overflow: "hidden" }}
              >
                <img
                  src={appUrl.postUrl + post.imagePath}
                  alt="Post"
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )} */}
            <div className="post-body">
              <div className="post-date">
                <span className="day">
                  {new Date(post.createdAt).getDate()}
                </span>
                <span className="month">
                  Th{new Date(post.createdAt).getMonth()}
                </span>
              </div>
              <h2 className="post-title">{post.name}</h2>
              <div className="post-meta">
                {/* <a href="#" className="hash-scroll">0 Comments</a> */}
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.detail }}
              ></div>
              <div className="post-share">
                <h3 className="d-flex align-items-center">
                  <i
                    className="fas fa-share"
                    style={{ cursor: "pointer" }}
                    onClick={copyToClipboard}
                  />
                  Chia sẽ bài viết
                </h3>
              </div>
              <div className="post-author row">
                <div className="col-md-12">
                  <h3>
                    <i className="far fa-user" />
                    Tác giả
                  </h3>
                </div>
                <Avatar
                  image={
                    post.createdBy?.avatar !== undefined &&
                    appUrl.avatarURL + post.createdBy?.avatar
                  }
                  alt="author"
                  size="xlarge"
                />
                <div className="author-content">
                  <h4>
                    {post.createdBy?.firstName + " " + post.createdBy?.lastName}
                  </h4>
                </div>
                {/* End .author.content */}
              </div>
              {/* End .post-author */}
              <div className="comment-respond">
            <h3>Bình luận</h3>
            <FacebookComments
        url="https://developers.facebook.com/docs/plugins/comments#configurator" 
        numPosts={5} 
        width="100%" 
      />
          </div>
            </div>
          </article>
          <hr className="mt-2 mb-1" />
          {postData.length>0&&(
            <div className="related-posts">
           
            <h4>Bài viết khác</h4>
            <Swiper
    key={post.id}
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    modules={[FreeMode, Pagination]}
    className="mySwiper"
  >
    {postData.map((product)=>(
        <SwiperSlide key={product.id}><ItemPost data={product}/></SwiperSlide>
    ))}
    
   
  </Swiper>
            {/* End .owl-carousel */}
          </div>
          )}
          
          {/* End .related-posts */}
        </div>
        {/* <aside className="sidebar mobile-sidebar col-lg-3">
          <div className="pin-wrapper" style={{ height: "630.156px" }}>
            <div
              className="sidebar-wrapper"
              data-sticky-sidebar-options='{"offsetTop": 72}'
              style={{
                borderBottom: "0px none rgb(119, 119, 119)",
                width: 280,
              }}
            >
              <div className="widget widget-categories">
                <h4 className="widget-title">Blog Categories</h4>
                <ul className="list">
                  <li>
                    <a href="#">All about clothing</a>
                    <ul className="list">
                      <li>
                        <a href="#">Dresses</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Make-up &amp; beauty</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                  <li>
                    <a href="#">Fashion trends</a>
                  </li>
                  <li>
                    <a href="#">Haircuts &amp; hairstyles</a>
                  </li>
                </ul>
              </div>
              
              <div className="widget">
                <h4 className="widget-title">Recent Posts</h4>
                <ul className="simple-post-list">
                  <li>
                    <div className="post-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/widget/post-1.jpg"
                          alt="Post"
                        />
                      </a>
                    </div>
                    <div className="post-info">
                      <a href="single.html">Post Format - Video</a>
                      <div className="post-meta">April 08, 2018</div>
                      
                    </div>
                    
                  </li>
                  <li>
                    <div className="post-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/widget/post-2.jpg"
                          alt="Post"
                        />
                      </a>
                    </div>
                    <div className="post-info">
                      <a href="single.html">Post Format - Image</a>
                      <div className="post-meta">March 23, 2016</div>
                      
                    </div>
                    
                  </li>
                </ul>
              </div>
              
              <div className="widget">
                <h4 className="widget-title">Tags</h4>
                <div className="tagcloud">
                  <a href="#">ARTICLES</a>
                  <a href="#">CHAT</a>
                </div>
                
              </div>
              
            </div>
          </div>
          
        </aside> */}
        {/* End .col-lg-3 */}
      </div>
      
      {/* End .row */}
    </div>
  );
}

export default PostDetail;
