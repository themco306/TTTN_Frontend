import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import provinceApi from "../../api/provinceApi";
import { orderInfoApi } from "../../api/orderInfoApi";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { validateOrderInfo } from "../../utils/validateOrderInfo";
import useCustomException from "../../utils/useCustomException";
import ShowValiMsg from "../../utils/ShowValiMsg";

function Address() {
  const handleException = useCustomException();
  const [orderInfoData,setOrderInfoData]=useState([])
  const [selectedOrderInfo,setSelectedOrderInfo]=useState(null)
  const [dataForSend,setDataForSend]=useState({
    id:null,
    deliveryAddress:"",
    deliveryWard:"",
    deliveryDistrict:"",
    deliveryProvince:"",
    deliveryName:"",
    deliveryPhone:""
  })
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [lDistrict, setLDistrict] = useState(false);
  const [lWard, setLWard] = useState(false);
  const [lSubmit, setLSubmit] = useState(false);
  const [lDelete,setLDelete]=useState(false);
  const [errors,setErrors]=useState({})
  const countryOptionTemplate = (option) => {
    const name =
      option?.province_name || option?.district_name || option?.ward_name || "";

    return (
      <div className="flex align-items-center">
        <div style={{ fontSize: 15 }}>{name}</div>
      </div>
    );
  };
  const orderInfoTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <div style={{ fontSize:15,color:'orange' }}>
            <span style={{ fontWeight:'bold',color:'black' }}>Tên: </span>{option?.deliveryName}<span style={{ fontWeight: "bold", color: "black" }}>
                    , Sdt:{" "}
                  </span> {option?.deliveryPhone}
            </div>
            <div style={{ fontSize:13,color:'orange'  }}>
              <span style={{ fontWeight:'bold',color:'black' }}>Địa chỉ: </span><span>{`${option?.deliveryAddress}, ${option?.deliveryWard}, ${option?.deliveryDistrict}, ${option?.deliveryProvince}.`}</span>
            </div>
        </div>
    );
};
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await provinceApi.getProvince();
        console.log(response);
        if (response.status === 200) {
          setProvinceData(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, []);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await orderInfoApi.getAll();
        console.log(';;;;',response);
        if (response.status === 200) {
         setOrderInfoData(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, []);
  const handleSetDistrictData = async (data) => {
    if (data.province_id !== undefined) {
      setLDistrict(true)
      setProvince(data);
      try {
        const response = await provinceApi.getDistrictProvinceId(
          data.province_id
        );
        console.log(response);
        if (response.status === 200) {
          setDistrictData(response.data.results);
          setLDistrict(false)
        }
      } catch (error) {
        console.log(error);
        setLDistrict(false)
      }
    }
  };
  const handleSetWardData = async (data) => {
    if (data.district_id !== undefined) {
      setLWard(true)
      setDistrict(data);
      try {
        const response = await provinceApi.getWardDistrictId(data.district_id);
        console.log(response);
        if (response.status === 200) {
          setWardData(response.data.results);
          setLWard(false)
        }
      } catch (error) {
        console.log(error);
        setLWard(false)

      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForSend({
      ...dataForSend,
      [name]: value
    });
  };
  const handleSetDataForSend = async (data) => {
    console.log('click', selectedOrderInfo, data)
    if (selectedOrderInfo !== null && data === null) {
      return
    }
    if (selectedOrderInfo !== null && selectedOrderInfo.id !== data.id) {
      setSelectedOrderInfo(null)
      setDataForSend({
        id: null,
        deliveryAddress: "",
        deliveryWard: "",
        deliveryDistrict: "",
        deliveryProvince: "",
        deliveryName: "",
        deliveryPhone: ""
      })
    } else {
      setSelectedOrderInfo(data)
      setDataForSend(data)
      const provinceSelectd = provinceData.find((item) => (item.province_name === data.deliveryProvince))
      if (provinceSelectd) {
        setProvince(provinceSelectd)
        // Sử dụng hàm callback của setState để đảm bảo rằng dữ liệu quận/huyện chỉ được thiết lập sau khi dữ liệu tỉnh/thành phố đã được cập nhật.
        await setDistrict(null)
        await handleSetDistrictData(provinceSelectd)
      } else {
        setProvince(null)
      }
  
  
      const districtSelected = districtData.find((item) => (item.district_name === data.deliveryDistrict))
      if (districtSelected) {
        setDistrict(districtSelected)
        await setWard(null)
        await handleSetWardData(districtSelected)
      } else {
        setDistrict(null)
      }
      const wardSelected = wardData.find((item) => (item.ward_name === data.deliveryWard))
      if (wardSelected) {
        setWard(wardSelected)
      } else {
        setWard(null)
      }
    }
  }
  
  const handleCreateOrUpdate =async()=>{
    try {
      setLSubmit(true)
 
      await validateOrderInfo.validate({deliveryAddress:dataForSend.deliveryAddress,
        deliveryWard:ward?.ward_name??"",
        deliveryDistrict:district?.district_name??"",
        deliveryProvince:province?.province_name??'',
        deliveryName:dataForSend.deliveryName,
        deliveryPhone:dataForSend.deliveryPhone},{abortEarly:false})
      const data={
        deliveryAddress:dataForSend.deliveryAddress,
      deliveryWard:ward.ward_name,
      deliveryDistrict:district.district_name,
      deliveryProvince:province.province_name,
      deliveryName:dataForSend.deliveryName,
      deliveryPhone:dataForSend.deliveryPhone
      }
      if(dataForSend.id!==null){

        console.log(data)
        const response=await orderInfoApi.update(dataForSend.id,data)
        console.log(response)
        if(response.status===200){
          toast.success(response.data.message)
          const updatedOrderInfoData = orderInfoData.map(order => {
            if (order.id === dataForSend.id) {
              return {
                ...order,
                deliveryAddress: dataForSend.deliveryAddress,
                deliveryWard: ward.ward_name,
                deliveryDistrict: district.district_name,
                deliveryProvince: province.province_name,
                deliveryName: dataForSend.deliveryName,
                deliveryPhone: dataForSend.deliveryPhone
              };
            }
            return order;
          });
          setOrderInfoData(updatedOrderInfoData);
          setSelectedOrderInfo(null)
          setDataForSend({
            id: null,
            deliveryAddress: "",
            deliveryWard: "",
            deliveryDistrict: "",
            deliveryProvince: "",
            deliveryName: "",
            deliveryPhone: ""
          })
          setErrors({})
          setLSubmit(false)
        }
      }else{
        console.log(data)
        const response=await orderInfoApi.create(data)
        console.log(response)
        if(response.status===200){
          toast.success(response.data.message)
      const newOrder = response.data.data;
      setOrderInfoData([newOrder,...orderInfoData]);
      setErrors({})

      setLSubmit(false)

          }
      }
    } catch (error) {
      console.log("ee", error);
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
      setLSubmit(false)
      
    }
  }
  const handleDelete=async()=>{
    try {
      setLDelete(true)
      if(selectedOrderInfo!==null){
        const response=await orderInfoApi.delete(selectedOrderInfo.id)
        if(response.status===200){
          const updatedOrderInfoData = orderInfoData.filter(order => order.id !== selectedOrderInfo.id);
          setOrderInfoData(updatedOrderInfoData);
          toast.success(response.data.message)
          setSelectedOrderInfo(null)
          setDataForSend({
            id: null,
            deliveryAddress: "",
            deliveryWard: "",
            deliveryDistrict: "",
            deliveryProvince: "",
            deliveryName: "",
            deliveryPhone: ""
          })
          setLDelete(false)
        }
      }
    } catch (error) {
      setLDelete(false)
    }
  }
  return (
    <div className="addresses-content">
      <h3 className="account-sub-title d-none d-md-block mb-1">
        <i className="sicon-location-pin align-middle mr-3" />
        Địa chỉ giao hàng
      </h3>
      <p className="mb-4">
        Các địa chỉ sau sẽ được sử dụng trên trang thanh toán theo mặc định.
      </p>
      <div className="row">
        <div className="address col-md-7">
          <div className="heading d-flex">
            <h4 className="text-dark mb-0">Thêm mới hoặc sửa </h4>
          </div>
          <div className="address-box">
            <div className="address account-content mt-0 pt-2">
                <div className="form-group">
                  <label>
                    Tên gọi khi nhận hàng <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" onChange={handleChange} name="deliveryName" value={dataForSend.deliveryName}/>
                  <ShowValiMsg>{errors.deliveryName}</ShowValiMsg>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input onChange={handleChange} name="deliveryPhone" type="number" className="form-control" value={dataForSend.deliveryPhone} />
                  <ShowValiMsg>{errors.deliveryPhone}</ShowValiMsg>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Tỉnh/Thành phố <span className="required">*</span>
                      </label>
                      <div className="form-control p-0 ">
                        <Dropdown
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "0",
                          }}
                          value={province}
                          onChange={(e) => {
                            handleSetDistrictData(e.value);
                          }}
                          options={provinceData}
                          optionLabel="province_name"
                          checkmark={true}
                          highlightOnSelect={false}
                          valueTemplate={countryOptionTemplate}
                          filter
                          itemTemplate={countryOptionTemplate}
                        />
                  <ShowValiMsg>{errors.deliveryProvince}</ShowValiMsg>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Quận/Huyện <span className="required">*</span>
                      </label>
                      <div className="form-control p-0 ">
                        <Dropdown
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "0",
                          }}
                          loading={lDistrict}
                          value={district}
                          onChange={(e) => handleSetWardData(e.value)}
                          options={districtData}
                          optionLabel="district_name"
                          checkmark={true}
                          highlightOnSelect={false}
                          filter
                          valueTemplate={countryOptionTemplate}
                          itemTemplate={countryOptionTemplate}
                        />
                  <ShowValiMsg>{errors.deliveryDistrict}</ShowValiMsg>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Phường/Xã <span className="required">*</span>
                      </label>
                      <div className="form-control p-0 ">
                        <Dropdown
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "0",
                          }}
                          loading={lWard}
                          value={ward}
                          onChange={(e) => setWard(e.value)}
                          options={wardData}
                          optionLabel="ward_name"
                          checkmark={true}
                          highlightOnSelect={false}
                          valueTemplate={countryOptionTemplate}
                          filter
                          itemTemplate={countryOptionTemplate}
                        />
                  <ShowValiMsg>{errors.deliveryWard}</ShowValiMsg>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Địa chỉ cụ thể<span className="required">*</span>
                  </label>
                  <input
                  onChange={handleChange} name="deliveryAddress"
                    type="text"
                    className="form-control"
                    placeholder="Ấp , Tên đường, số nhà ,..."
                    value={dataForSend.deliveryAddress}
                  />
                  <ShowValiMsg>{errors.deliveryAddress}</ShowValiMsg>

                </div>
            </div>
          </div>
          <Button loading={lSubmit} onClick={handleCreateOrUpdate} className="btn btn-default ">
            {selectedOrderInfo===null?"Thêm mới":"Sửa"}
          </Button>
        </div>
        <div className="address col-md-5 mt-5 mt-md-0">
          <div className="heading d-flex">
            <h4 className="text-dark mb-0">Danh sách địa chỉ</h4>
          </div>
          <div className="address-box" >
          <ListBox value={selectedOrderInfo} onChange={(e) => handleSetDataForSend(e.value)} options={orderInfoData} 
              itemTemplate={orderInfoTemplate}  listStyle={{ maxHeight: '400px' }} />
          </div>
          <Button
            disabled={selectedOrderInfo===null}
            className="btn btn-default "
            onClick={handleDelete}
            loading={lDelete}
          >
            Xóa đang chọn
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Address;
