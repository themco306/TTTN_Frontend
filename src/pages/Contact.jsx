import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import webInfoApi from '../api/webInfoApi';
import contactApi from '../api/contactApi';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';

function Contact() {
  const handleException=useCustomException()
  const [webInfo,setWebInfo]=useState({});
  const isLoggedIn=useSelector(state=>state.authReducer?.isLoggedIn)
  const {user}=useSelector(state=>state.authReducer)
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [content,setContent]=useState('')
  const [loading,setLoading]=useState(false)
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await webInfoApi.getFirst();
              if (res.status === 200) {
                console.log(res)
                 setWebInfo(res.data)
              }
          } catch (error) {
            
          }
      };
      fetchData();
  }, []);
  useEffect(()=>{
    if(isLoggedIn){
      setName(user?.firstName+" "+user?.lastName)
      setEmail(user?.email)
      setPhone(user?.phoneNumber)
    }
  },[user])
  const handleSubmit=async(contactData)=>{
    try {
      setLoading(true)
      const response=await contactApi.add(contactData)
      if(response.status===200){
        toast.success(response.data.message)
        setLoading(false)
      }
    } catch (error) {
       if(error?.response){
              handleException(error)
             }
             setLoading(false)
    } 
  }
const onSubmit = (e) => {
    e.preventDefault(); // Sửa chính tả ở đây
    handleSubmit({ name, email, phone, content });
}
  return (
<div><nav aria-label="breadcrumb" className="breadcrumb-nav">
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="demo4.html"><i className="icon-home" /></a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Liên Hệ
        </li>
      </ol>
    </div>

  </nav>
  
  <div className="container contact-us-container">
  <div className="contact-info">
    <div className="row">
      <div className="col-12">
        <h2 className="ls-n-25 m-b-1">
          Thông Tin Liên hệ
        </h2>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box text-center">
          <i className="sicon-location-pin" />
          <div className="feature-box-content">
            <h3>Địa chỉ</h3>
            <h5>{webInfo?.address}</h5>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box text-center">
          <i className="fa fa-mobile-alt" />
          <div className="feature-box-content">
            <h3>Điện Thoại</h3>
            <h5>{webInfo?.phoneNumber}</h5>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box text-center">
          <i className="far fa-envelope" />
          <div className="feature-box-content">
            <h3>E-mail</h3>
            <h5><a  className="__cf_email__" data-cfemail="a1d1ced3d5cee1d1ced3d5ced5c9c4ccc48fc2cecc">{webInfo?.email}</a></h5>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box text-center">
          <i className="far fa-calendar-alt" />
          <div className="feature-box-content">
          <h3>Ngày/Giờ làm việc</h3>
<h5>{webInfo?.workingHours}</h5>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-6">
      <h2 className="mt-6 mb-2">LIÊN HỆ VỚI CHÚNG TÔI</h2>
      <form className="mb-0" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="mb-1" htmlFor="contact-name">Họ & Tên
            <span className="required">*</span></label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="contact-name" name="contact-name" required />
        </div>
        <div className="form-group">
          <label className="mb-1" htmlFor="contact-email"> Email
            <span className="required">*</span></label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="contact-email" name="contact-email" required />
        </div>
        <div className="form-group">
          <label className="mb-1" htmlFor="contact-phone">Số ĐT
            <span className="required">*</span></label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" className="form-control" id="contact-phone" name="contact-phone" required />
        </div>
        <div className="form-group">
          <label className="mb-1" htmlFor="contact-message">Nội dung
            <span className="required">*</span></label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} cols={30} rows={1} id="contact-message" className="form-control" name="contact-message" required placeholder='Bạn muốn gì ....'/>
        </div>
        <div className="form-footer mb-0">
          <button disabled={loading} type="submit" className="btn btn-dark font-weight-normal">
            Gửi
          </button>
        </div>
      </form>
    </div>
    <div className="col-lg-6" >
      <div className='mt-6' dangerouslySetInnerHTML={{ __html:webInfo?.googleMap }}></div>
    </div>
  </div>
</div>

  
  </div>

  )
}

export default Contact