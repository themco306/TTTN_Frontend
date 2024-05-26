import axiosInstance from "./axiosInstance"
const categoryApi={
    getActive(){
        var url='categories/active'
        return axiosInstance.get(url)
    }

}
export default categoryApi