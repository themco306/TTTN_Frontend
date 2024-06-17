import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useCustomException from "../utils/useCustomException";
import { userApi } from "../api/userApi";

function SendEmail() {
  const navigate = useNavigate();
  const handleException = useCustomException();
  const user = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user !== null && user.emailConfirmed) {
      navigate("/");
    }
  }, [user]);

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const currentHost = window.location.origin;
      const response = await userApi.sendEmailConfirm(
        user.id,
        currentHost + "/xac-nhan-email"
      );
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status) {
        handleException(error);
      }
      setLoading(false);
    }
  };
  return (
    < >
        <ToastContainer />
        <div className="page-wrapper"></div>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: 500,
      }}
    >
      <h2>Bạn chưa xác thực email</h2>
      <div>
        <p>
          {!loading ? (
            <span
              onClick={handleSendMail}
              style={{ color: "green", cursor: "pointer" }}
            >
                   Nhấn vào đây!
            </span>
          ) : (
            <span style={{ color: "black", cursor: "pointer" }}>
           
              Vui lòng đợi!

              <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i>
            </span>
          )}{" "}
          để gửi liên kết về Email <span style={{ fontWeight:'bold' }}>{user?.email}</span>
          
        </p>
        <p>
          ?Hoặc <a href="/">trở về.</a>
        </p>
      </div>
    </div>
    </>
  );
}

export default SendEmail;
