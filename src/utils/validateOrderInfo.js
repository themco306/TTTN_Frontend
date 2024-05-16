
import * as Yup from "yup";


const validateOrderInfo = Yup.object({
  deliveryName: Yup.string()
    .required("Tên gọi là bắt buộc")
    .min(2, "Tên gọi phải có ít nhất 2 ký tự")
    .max(30, "Tên gọi không được vượt quá 30 ký tự"),
    deliveryProvince: Yup.string()
    .required("Tỉnh/Thành phố là bắt buộc"),
    deliveryDistrict: Yup.string()
    .required("Quận/Huyện là bắt buộc"),
    deliveryWard: Yup.string()
    .required("Phường/Xã là bắt buộc"),
    deliveryAddress: Yup.string()
    .required("Địa chỉ cụ thể khoản là bắt buộc")
    .min(2, "Địa chỉ cụ thể phải có ít nhất 2 ký tự")
    .max(100, "Địa chỉ cụ thể không được vượt quá 100 ký tự"),
    deliveryPhone: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có từ 10 đến 11 chữ số"),
});
export {  validateOrderInfo };
