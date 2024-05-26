import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import useCustomException from '../utils/useCustomException';
import { userApi } from '../api/userApi';
import { toast } from 'react-toastify';

function Login() {
  const { loginContext } = useAuth();
  const navigate = useNavigate();
  const handleException = useCustomException();
  const [lLogin,setLLogin]=useState(false);
  const [lRegister,setLRegister]=useState(false);
  //login
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe,setRememberMe]=useState(false)

  //register
  const [email,setEmail]=useState('')
  const [rPassword,setRPassword]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [rConfirmPassword,setRConfirmPassword]=useState('')

  const handleLogin = async (userData) => {
    try {
      setLLogin(true)
      const response = await userApi.login(userData);
      console.log(response);
      if (response.status == 200) {
        setLLogin(false)
          // navigate("/");
          loginContext(response.data)
        
      }
    } catch (error) {
      setLLogin(false)
      if(error.response){
        handleException(error)
      }
    }
  };
const handleRegister =async(userData)=>{
  try {
    console.log(userData)
    setLRegister(true)
    const response = await userApi.register(userData);
    console.log(response);
    if (response.status == 200) {
      setLRegister(false)
      toast.success(response.data.message)
       await handleLogin({emailOrUsername:userData.email,password:userData.password})
    }
  } catch (error) {
    setLRegister(false)
    if(error.response){
      handleException(error)
    }
  }
}
  // Xử lý sự kiện submit form đăng nhập
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    handleLogin({ emailOrUsername, password,rememberMe });
  };
  const handleRegisterSubmit =(event)=>{
    event.preventDefault();
    handleRegister({ firstName,lastName,email,password:rPassword,confirmPassword:rConfirmPassword });
  }
  return (
    <div className="container login-container">
  <div className="row">
    <div className="col-lg-10 mx-auto">
      <div className="row">
        <div className="col-md-6">
          <div className="heading mb-1">
            <h2 className="title">Đăng Nhập</h2>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="login-email">
              Tài Khoản Hoặc Email
              <span className="required">*</span>
            </label>
            <input value={emailOrUsername} onChange={(e)=>setEmailOrUsername(e.target.value)} type="text" className="form-input form-wide" id="login-email" required />
            <label htmlFor="login-password">
              Mật Khẩu
              <span className="required">*</span>
            </label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-input form-wide" id="login-password" required autoComplete='new-password'/>
            <div className="form-footer">
              <div className="custom-control custom-checkbox mb-0">
                <input type="checkbox" checked={rememberMe} onChange={()=>setRememberMe(!rememberMe)} className="custom-control-input" id="lost-password" />
                <label className="custom-control-label mb-0" htmlFor="lost-password">Lưu đăng nhập</label>
              </div>
              <Link to="/quen-mat-khau" className="forget-password text-dark form-footer-right">Quên mật khẩu?</Link>
            </div>
            <button disabled={lLogin} type="submit" className="btn btn-dark btn-md w-100">
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="heading mb-1">
            <h2 className="title">Đăng Ký</h2>
          </div>
          <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="first-name">
              Họ
              <span className="required">*</span>
            </label>
            <input type="text" className="form-input form-wide" id="first-name" required autoComplete='name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            <label htmlFor="last-name">
              Tên
              <span className="required">*</span>
            </label>
            <input type="text" className="form-input form-wide" id="last-name" required autoComplete='name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            <label htmlFor="register-email">
              Email
              <span className="required">*</span>
            </label>
            <input type="email" className="form-input form-wide" id="register-email" required autoComplete='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="register-password">
              Mật khẩu
              <span className="required">*</span>
            </label>
            <input type="password" className="form-input form-wide" id="register-password" required autoComplete='new-password' value={rPassword} onChange={(e)=>setRPassword(e.target.value)}/>
            <label htmlFor="register-confirm-password">
              Nhập lại mật khẩu
              <span className="required">*</span>
            </label>
            <input type="password" className="form-input form-wide" id="register-confirm-password" required autoComplete='new-password' value={rConfirmPassword} onChange={(e)=>setRConfirmPassword(e.target.value)}/>
            <div className="form-footer mb-2">
              <button disabled={lRegister}  type="submit" className="btn btn-dark btn-md w-100 mr-0">
                ĐĂNG KÝ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login
