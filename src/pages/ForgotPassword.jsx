import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userApi } from '../api/userApi';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';
import { Button } from 'primereact/button';

function ForgotPassword() {
    const handleException=useCustomException()
    const [emailOrUsername,setEmailOrUsername]=useState('')
    const [loading,setLoading]=useState(false)
    const SendMail=async(userData)=>{
        try {
            setLoading(true);
            const currentHost = window.location.origin;
            const data={
                emailOrUsername:userData.emailOrUsername,
                currentHost:currentHost + "/xac-nhan-dat-lai-mat-khau"
            }
            console.log(data)
            const response = await userApi.sendResetPasswordConfirm(data);
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await SendMail({emailOrUsername});
      }
  return (
    <div className="container reset-password-container">
  <div className="row">
    <div className="col-lg-6 offset-lg-3">
      <div className="feature-box border-top-primary">
        <div className="feature-box-content">
          <form className="mb-0" onSubmit={handleSubmit}>
            <p>
            Quên mật khẩu? Vui lòng nhập tên người dùng hoặc địa chỉ email của bạn. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.
            </p>
            <div className="form-group mb-0">
              <label htmlFor="reset-email" className="font-weight-normal">Tên tài khoản hoặc email</label>
              <input type="text" value={emailOrUsername} className="form-control" id="reset-email" name="reset-email" required onChange={(e)=>setEmailOrUsername(e.target.value)} />
            </div>
            <div className="form-footer mb-0">
              <Link to="/dang-nhap">Đăng nhập</Link>
              <Button loading={loading} type="submit" className="btn btn-md btn-primary form-footer-right font-weight-normal text-transform-none mr-0">
                Đặt lại mật khẩu
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ForgotPassword
