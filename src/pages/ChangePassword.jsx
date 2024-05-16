import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/userApi';
import { toast } from 'react-toastify';
import { validateResetPassword } from '../utils/validateResetPassword';
import { Button } from 'primereact/button';
import ShowValiMsg from '../utils/ShowValiMsg';
import useCustomException from '../utils/useCustomException';

function ChangePassword() {
    const { email, confirmToken } = useParams();
    const handleException=useCustomException()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
    let decodedToken = decodeURIComponent(confirmToken);
    const handleConfirm=async ()=>{
        try {
            setLoading(true)
            await validateResetPassword.validate({password,confirmPassword},{abortEarly:false})
            const data={
                email:email,
                token:decodedToken,
                password,
                confirmPassword
                
            }
            const response=await userApi.confirmSetPassword(data)
            console.log(response)
            if(response.status===200){
                toast.success(response.data.message)
                setTimeout(() => {
                    
                    setLoading(false); 
                    navigate("/dang-nhap"); 
                  }, 2000); 
            }
        } catch (error) {
            if (error.response?.status) {
                handleException(error);
              } else {
                const newError = {};
                error.inner?.forEach((e) => {
                  newError[e.path] = e.message;
                });
                console.log(newError);
                setErrors(newError);
              }
              setLoading(false)

        }
      }
  return (
    <div className="container reset-password-container">
  <div className="row">
    <div className="col-lg-6 offset-lg-3">
      <div className="feature-box border-top-primary">
        <div className="feature-box-content">

            <p>
            Xin hãy nhớ kỹ mật khẩu trước khi đặt lại.
            </p>
            <div className="form-group mb-0">
            <label htmlFor="acc-password">Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            id="acc-new-password"
            name="acc-new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ShowValiMsg>{errors.password}</ShowValiMsg>
            </div>
            <div className="form-group mb-0">
            <label htmlFor="acc-password">Nhập lại mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="acc-confirm-password"
            name="acc-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ShowValiMsg>{errors.confirmPassword}</ShowValiMsg>
            </div>
            <div className="form-footer mb-0">
              <Link to="/dang-nhap">Đăng nhập</Link>
              <Button onClick={handleConfirm}  loading={loading} type="submit" className="btn btn-md btn-primary form-footer-right font-weight-normal text-transform-none mr-0">
                Đặt lại mật khẩu
              </Button>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ChangePassword
