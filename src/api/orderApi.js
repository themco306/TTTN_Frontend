
import axiosInstance from "./axiosInstance"
export const orderApi = {
    submitCode(code){
        var url = 'coupons/code/'+code
        return axiosInstance.get(url)
    },
    createOrder(data){
        var url = 'orders'
        return axiosInstance.post(url,data)
    },
    getByCode(code){
        var url = 'orders/code/'+code;
        return axiosInstance.get(url)
    },
    sendOrderConfirmEmail(id,data){
        var url = 'orders/sendEmailConfirm/'+id;
        return axiosInstance.post(url,data)
    },
    confirmEmail(id,data){
        var url='orders/confirmEmail/'+id
        return axiosInstance.post(url,data)
    },
    getMyOrder(page=1,pageSize=5){
        var url=`orders/myOrder?page=${page}&pageSize=${pageSize}`
        return axiosInstance.get(url)
    }
}