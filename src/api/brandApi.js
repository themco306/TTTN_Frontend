import axiosInstance from "./axiosInstance"
const brandApi={
    getActive(){
        var url='brands/active'
        return axiosInstance.get(url)
    }

}
export default brandApi