
import axiosInstance from "./axiosInstance"
export const orderApi = {
    submitCode(code){
        var url = 'coupons/code/'+code
        return axiosInstance.get(url)
    }

}