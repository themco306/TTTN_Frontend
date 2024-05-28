
import axiosInstance from "./axiosInstance"
export const userApi = {
    login(data) {
        var url = 'account/signin'
        return axiosInstance.post(url, data)
    },
    register(data) {
        var url = 'account/signup'
        return axiosInstance.post(url, data)
    },
    add2Cart(data){
        var url = 'carts'
        return axiosInstance.post(url, data)
    },
    changeQuantity(id,data){
        var url=`carts/quantity/${id}/${data}`
        return axiosInstance.put(url,data)
    },
    removeFromCart(id){
        var url='carts/'+id
        return axiosInstance.delete(url)
    },
    getMyCart(){
        var url = 'carts/my-cart'
        return axiosInstance.get(url)
    },
    sendResetPasswordConfirm(data){
        var url='account/sendResetPasswordConfirm'
        return axiosInstance.post(url,data)
    },
    sendEmailConfirm(id,data){
        var url='account/sendEmailConfirm/'+id
        return axiosInstance.post(url,data)
    },
    confirmEmail(id,data){
        var url='account/confirmEmail/'+id
        return axiosInstance.post(url,data)
    },
    confirmSetPassword(data){
        var url='account/confirmSetPassword'
        return axiosInstance.post(url,data)
    },
    get(id){
        var url='account/'+id
        return axiosInstance.get(url)
    },
    getMe(){
        var url='account/myEdit'
        return axiosInstance.get(url)
    },
    myUpdate(id, data) {
        var url = 'account/my/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.put(url, data, config);
    },

}