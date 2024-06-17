import React, { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { validateUUser } from "../../utils/validateUser";
import { authActions } from "../../state/actions/authActions";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import useCustomException from "../../utils/useCustomException";
import ShowValiMsg from "../../utils/ShowValiMsg";
import appUrl from "../../api/appUrl";
import { Image } from "primereact/image";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";
import linkAvatar from "../../utils/linkAvatar";
function AccountDetail({ user }) {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [firstname, setFirstname] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [username, setUsername] = useState(user.userName);
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [gender, setGender] = useState(user.gender);
  const [lSubmit, setLSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      setLSubmit(true);

      await validateUUser.validate(
        {
          firstname,
          lastname,
          username,
          oldPassword,
          password,
          confirmPassword,
          email,
          phoneNumber,
        },
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);

      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("avatar", avatar);
      const response = await userApi.myUpdate(user.id, formData);
      console.log(response);
      if (response.status === 200) {
        dispatch(authActions.login(response.data.data));
        localStorage.setItem(
          "userCustomer",
          JSON.stringify(response.data.data)
        );
        setErrors({});
        setAvatar(null);
        toast.success(response.data.message);
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
    } finally {
      setLSubmit(false);
    }
  };
  return (
    <div className="account-content">
      <h3 className="account-sub-title d-none d-md-block mt-0 pt-1 ml-1">
        <i className="icon-user-2 align-middle mr-3 pr-1" />
        Thông tin chi tiết
      </h3>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="acc-name">
              Họ <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nguyễn"
              id="acc-name"
              name="acc-name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <ShowValiMsg>{errors.firstname}</ShowValiMsg>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="acc-lastname">
              Tên <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="acc-lastname"
              name="acc-lastname"
              placeholder="Khanh"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <ShowValiMsg>{errors.lastname}</ShowValiMsg>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="acc-phone">
              Số điện thoại <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="0987654321"
              id="acc-phone"
              name="acc-phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <ShowValiMsg>{errors.phoneNumber}</ShowValiMsg>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="acc-gender">
              Giới tính <span className="required">*</span>
            </label>
            <div className="row form-group form-group-custom-control ">
              <div className="col-md-6 custom-control custom-radio d-flex">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="gender"
                  checked={gender === true}
                  onChange={() => setGender(true)}
                />
                <label className="custom-control-label">Nam</label>
              </div>
              <div className="col-md-6 custom-control custom-radio d-flex">
                <input
                  type="radio"
                  name="gender"
                  className="custom-control-input"
                  checked={gender === false}
                  onChange={() => setGender(false)}
                />
                <label className="custom-control-label">Nữ</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="acc-userName">
              Tên tài khoản<span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="acc-userName"
              name="acc-userName"
              placeholder="editor123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <ShowValiMsg>{errors.username}</ShowValiMsg>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="avatar" style={{ display: "block" }}>
              Ảnh đại diện:
            </label>
            <div style={{ overflow: "hidden" }}>
              <label
                htmlFor="avatar"
                style={{ cursor: "pointer", fontSize: 20 }}
              >
                Chọn ảnh
              </label>
              {avatar !== null && (
                <Button
                  icon={PrimeIcons.REFRESH}
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                    setAvatar(null);
                    setSelectAvatar(null);
                  }}
                ></Button>
              )}
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  float: "left",
                  width: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <div style={{ float: "right" }}>
                {selectAvatar !== null ? (
                  <Image
                    src={selectAvatar}
                    alt="Selected Avatar"
                    width={100}
                    preview
                  />
                ) : (
                  <Image
                    src={previewAvatar && linkAvatar(previewAvatar)}
                    width={100}
                    preview
                  />
                  
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="acc-email">
          Địa chỉ Email<span className="required">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          id="acc-email"
          name="acc-email"
          placeholder="editor@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <ShowValiMsg>{errors.email}</ShowValiMsg>
      </div>
      <div className="change-password">
        <h3 className="text-uppercase mb-2">Thay đổi mật khẩu</h3>
        <div className="form-group">
          <label htmlFor="acc-password">
            Mật khẩu cũ (có thể bỏ trống nếu không thay đổi)
          </label>
          <input
            type="password"
            className="form-control"
            id="acc-password"
            name="acc-password"
            autoComplete="new-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <ShowValiMsg>{errors.oldPassword}</ShowValiMsg>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
      </div>
      <div className="form-footer mt-3 mb-0">
        <Button
          loading={lSubmit}
          severity="success"
          onClick={handleSubmit}
          className="btn btn-dark mr-0"
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

export default AccountDetail;
