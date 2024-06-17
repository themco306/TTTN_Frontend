import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import React, { useState } from 'react';
import rateApi from '../api/rateApi';
import { toast } from 'react-toastify';
import useCustomException from '../utils/useCustomException';
import ReactPlayer from 'react-player';
// import fileUploadApi from '../api/fileUploadApi'; // Assuming you have a separate API for file uploads

function ModalRate({ item }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleException = useCustomException();
    const [star, setStar] = useState(0);
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [hoveredFile, setHoveredFile] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const footerContent = (
        <div>
            <Button loading={loading} label="Đánh giá" icon="pi pi-check" onClick={() => handleRate()} autoFocus />
        </div>
    );

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files).slice(0, 5 - files.length); // Limit the number of files to 5
        setFiles([...files, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleUploadFiles = async (id) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            const response = await rateApi.addFiles(id,formData);
        } catch (error) {
            handleException(error);
        }
    };

    const handleRate = async () => {
        try {
            if (star === 0) {
                toast.warn("Vui lòng chọn số sao");
                return;
            }
            if (content === '') {
                toast.warn("Vui lòng điền nội dung");
                return;
            }
            setLoading(true);
            const data = {
                productId: item.product.id,
                star,
                content,
            };

            const response = await rateApi.add(data);
            console.log(response)
            if (response.status === 200) {
                handleUploadFiles(response.data.data.id)
                toast.success(response.data.message);
                setStar(0);
                setContent('');
                setFiles([]);
                setLoading(false);
                setVisible(false);
            }
        } catch (error) {
            setLoading(false);
            handleException(error);
        }
    };

    const handleVideoClick = (filePath) => {
        // window.open(filePath, '_blank');
        setVideoUrl(filePath);
        setPlaying(true);
    };

    return (
        <>
            <Button onClick={() => setVisible(true)} disabled={item.status == "Received"} label="Đánh giá" tooltip="Bạn cũng có thể tới trang chi tiết sản phẩm để đánh giá" />
            <Dialog header={`Đánh giá sản phẩm: ${item.product.name}`} visible={visible} modal footer={footerContent} style={{ width: '70rem' }} onHide={() => setVisible(false)}>
                <div className='row'>
                    <div className="col-12 m-2" style={{ display: 'flex' }}>
                        <span style={{ fontSize: 15, marginRight: 3 }}><strong>Số sao: </strong></span>
                        <Rating size={20} value={star} onChange={(e) => setStar(e.value)} cancel={false} />
                    </div>
                    <div className="col-12 m-2" style={{ display: 'flex' }}>
                        <span style={{ fontSize: 15, marginRight: 3 }}><strong>Đánh giá: </strong></span>
                        <InputTextarea style={{ width: "80%", fontSize: 15 }} autoResize value={content} onChange={(e) => setContent(e.target.value)} rows={3} cols={30} />
                    </div>
                    <div className="col-12 m-2" style={{ display: 'flex',justifyItems:'start' }}>
                    <label style={{ cursor:"pointer" }} htmlFor='files'>
                        Chọn ảnh/video ({files.length}/5)
                        </label>
                        <input id='files' type="file" accept="image/*,video/*" multiple onChange={handleFileChange} disabled={files.length >= 5} style={{ visibility:"hidden" }}/>
                       
                        
                    </div>
                    <div className="col-12 m-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                style={{ position: 'relative', margin: '0.5rem' }} 
                               
                            >
                                {file.type.startsWith('image') ? (
                                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                ) : (
                                    <Button type="button" text style={{ position: 'relative' }}  onMouseEnter={() => setHoveredFile(index)} 
                                    onMouseLeave={() => setHoveredFile(null)}
                                    onClick={() => file.type.startsWith('video') && handleVideoClick(URL.createObjectURL(file))}>
                                        <ReactPlayer url={URL.createObjectURL(file)}  width={100} height={100} />
                                        {hoveredFile === index && (
                                            <Button type='button' icon="pi pi-play" className="p-button-rounded p-button-success" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                        )}
                                    </Button>
                                )}
                                <Button type='button' icon="pi pi-times" className="p-button-rounded p-button-danger" style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => handleRemoveFile(index)} />
                            </div>
                        ))}
                    </div>
                </div>
            </Dialog>
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
            zIndex:10000
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
        </>
    );
}

export default ModalRate;
