import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import topicApi from "../../api/topicApi";
import categoryApi from "../../api/categoryApi";
import brandApi from "../../api/brandApi";
import menuApi from "../../api/menuApi";

function NotFound() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const lastSegment = pathSegments.length === 0 ? '/' : pathSegments[pathSegments.length - 1];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await menuApi.getByLink(lastSegment)
        console.log(response)
        if(response.status===200){
            const data=response.data
            switch (data.type) {
              case "page":
                navigate('/bai-viet/' + lastSegment);
                break;
              case "topic":
                navigate('/bai-viet?chuDe=' + lastSegment);
                break
                case "category":
                  navigate('/san-pham?danhmuc=' + lastSegment);
                  break;
                  case "brand":
                    navigate('/san-pham?thuonghieu=' + lastSegment);
                    break;
              default:
                break;
            }
        }
      } catch (error) {
        
      }
      // try {
      //   const [topicResponse, categoryResponse, brandResponse] = await Promise.all([
      //     topicApi.getActive(),
      //     categoryApi.getActive(),
      //     brandApi.getActive()
      //   ]);

      //   const topic = topicResponse.data.find(item => item.slug === lastSegment);
      //   if (topic !== undefined) {
      //     navigate('/bai-viet?chuDe=' + lastSegment);
      //     return;
      //   }

      //   const category = categoryResponse.data.find(item => item.slug === lastSegment);
      //   if (category !== undefined) {
      //     navigate('/san-pham?danhmuc=' + lastSegment);
      //     return;
      //   }

      //   const brand = brandResponse.data.find(item => item.slug === lastSegment);
      //   if (brand !== undefined) {
      //     navigate('/san-pham?thuonghieu=' + lastSegment);
      //     return;
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    };

    fetchAllData();
  }, [lastSegment, navigate]);

  return (
    <div style={{ minHeight: "50vh",marginTop:"20%", display: 'flex', justifyContent: 'center' }}>
      <span style={{ fontSize: 20 }}>
        Trang này không tồn tại
      </span>
    </div>
  );
}

export default NotFound;
