
import * as Yup from "yup";


const validateResetPassword = Yup.object({
    password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
    ),
  confirmPassword: Yup.string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu xác nhận phải giống với mật khẩu"
    ),
});
export {  validateResetPassword };
