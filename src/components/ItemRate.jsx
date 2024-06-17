import React, { useRef, useState } from "react";
import appUrl from "../api/appUrl";
import LikeBox from "./LikeBox";
import CommentContentBox from "./CommentContentBox";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import rateApi from "../api/rateApi";
import { toast } from "react-toastify";
import AppRole from "../utils/AppRole";
import { Message } from "primereact/message";
import linkAvatar from "../utils/linkAvatar";

function ItemRate({ item, setLike }) {
  const { user } = useSelector((state) => state.authReducer);
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [lReport,setLReport]=useState(false)
  const [hidden,setHidden]=useState(item.status==1?false:true)
  const menu = useRef(null);

  const items = [
    ...(user?.roles.includes(AppRole.Admin)||user?.roles.includes(AppRole.SuperAdmin)
      ? [
          {
            label: hidden?"Hiện đánh giá":"Ẩn đánh giá",
            icon: "pi pi-pencil",
            command: () => {
              handleHidden()
            },
          },
        ]
      : [
          
        ]),
        {
          label: "Báo cáo",
          icon: "pi pi-flag",
          command: () => {
            if(!lReport){
              handleReport()

            }else{
              toast.warn("Bạn cần đợi 1 khoảng thời gian để báo cáo tiếp")
            }
          
          },
        },
  ];

  const handleVideoClick = (url) => {
    setVideoUrl(url);
    setPlaying(true);
  };
const handleReport=async()=>{
  try {
    setLReport(true)
    const response=await rateApi.report(item.id)
    console.log(response)
    if(response.status===200){
      toast.success(response.data.message)
      setTimeout(() => {
        setLReport(false); // Đặt lReport lại thành false sau 5 giây
      }, 5000);
    }
  } catch (error) {
    
  }
}
const handleHidden=async()=>{
  try {
    const response=await rateApi.changeStatus(item.id)
    if(response.status===200){
      setHidden(!hidden)
    }
  } catch (error) {
    
  }
}
  return (
    <div key={item.id} className="comments mb-2">
      <figure className="img-thumbnail">
        <img
          src={linkAvatar(item.user?.avatar)}
          alt="author"
          width={80}
          height={80}
        />
      </figure>
      <div className="comment-block">
        <div className="comment-header">
          <div className="comment-arrow" />
          <div className="ratings-container float-sm-right">
            <div className="product-ratings">
              <span
                className="ratings"
                style={{ width: `${(item.star / 5) * 100}%` }}
              />
              <span className="tooltiptext tooltip-top" />
            </div>
            <Button
              icon=""
              onClick={(event) => menu.current.toggle(event)}
              text
              aria-label="Options"
              style={{ display:user?.id === item.userId?"none":"inline-block" }}
            >
              <i style={{ fontSize: 18 }} className="pi pi-ellipsis-v"></i>
            </Button>
          </div>
          <span className="comment-by">
            <strong>{item.user?.firstName + " " + item.user?.lastName}</strong>{" "}
            – {new Date(item.createdAt).toLocaleString()}
            <LikeBox item={item} setLike={setLike} />
          </span>
        </div>
        {!hidden?(<> <div style={{ display: "flex" }}>
          {item.rateFiles.length > 0 &&
            item.rateFiles.map((file) => (
              <div key={file.id} style={{ width: "8%", marginRight: 2 }}>
                {file.fileType === "image" ? (
                  <Image preview src={appUrl.rateIUrl + file.filePath} />
                ) : (
                  <Button text raised  style={{position:'relative', cursor:"pointer",padding:0 }}  onMouseEnter={() =>{setHoveredVideoId(file.id);console.log(file.id)}}
                  onMouseLeave={() => setHoveredVideoId(null)} onClick={() => handleVideoClick(appUrl.rateVUrl + file.filePath)} >
                    <ReactPlayer
                      url={appUrl.rateVUrl + file.filePath}
                      width="100%"
                      height="100%"


                    />
                     {hoveredVideoId == file.id && (
                 <Button icon="pi pi-play" className="p-button-rounded p-button-success" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                )}
                  </Button>
                )}
              </div>
            ))}
        </div>
        <CommentContentBox content={item.content} />
        </>
      ):(<div>
        <Message severity="error" text="Đã ẩn đi vì vi phạm nguyên tắt cộng đồng"/>
       

      </div>)}
       
        
      </div>
      <Menu model={items} popup ref={menu} />
      {playing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex:1000
          }}
          onClick={() => setPlaying(false)}
        >
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            controls
            width="80%"
            height="80%"
          />
        </div>
      )}
    </div>
  );
}

export default ItemRate;
