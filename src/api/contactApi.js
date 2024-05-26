import axiosInstance from "./axiosInstance"
const contactApi={
    add(data){
        var url='contacts'
        return axiosInstance.post(url,data)
    }

}
export default contactApi