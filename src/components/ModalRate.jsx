import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import React, { useState } from 'react'
import rateApi from '../api/rateApi';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';

function ModalRate({item}) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleException = useCustomException();
    const [star,setStar]=useState(0)
    const [content,setContent]=useState('')
    const footerContent = (
        <div>
            <Button loading={loading} label="Đánh giá" icon="pi pi-check" onClick={()=>handleRate()} autoFocus />
        </div>
    );
    const handleRate=async()=>{
        try {
            if(star===0){
                toast.warn("Vui lòng chọn số sao")
                return
            }
            if(content===''){
                toast.warn("Vui lòng điền nội dung")
                return
            }
            setLoading(true)
          const data={
              productId:item.product.id,
              star,
              content
          }
          const response=await rateApi.add(data)
          if(response.status===200){
            toast.success(response.data.message)
            setStar(0)
            setContent('')
            setLoading(false)
          }
        } catch (error) {
            setLoading(false)
            if(error.response?.status){
                handleException(error)
      
              }
        }
      }
  return (
    <>
    <Button onClick={()=>setVisible(true)} disabled={item.status!=="Received"?false:true} label="Đánh giá" tooltip="Bạn cũng có thể tới trang chi tiết sản phẩm để đánh giá"/>
    <Dialog header={`Đánh giá sản phẩm: ${item.product.name}`} visible={visible} modal  footer={footerContent} style={{ width: '70rem' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className='row'>
                <div className="col-12 m-2" style={{ display:'flex' }}>
                    <span style={{ fontSize:15,marginRight:3 }}><strong>Số sao: </strong></span><Rating size={20} value={star} onChange={(e) => setStar(e.value)} cancel={false} />
                </div>
                <div className="col-12 m-2" style={{ display:'flex' }}>
                    <span style={{ fontSize:15,marginRight:3 }}><strong>Đánh giá: </strong></span>
                    <InputTextarea style={{ width:"80%",fontSize:15 }} autoResize value={content} onChange={(e) => setContent(e.target.value)} rows={3} cols={30} />
                </div>
           
            </div>
            </Dialog>
            </>
  )
}

export default ModalRate