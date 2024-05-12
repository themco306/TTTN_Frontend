import axiosInstance from "./axiosInstance"
const tagApi={
    getAll(){
        var url='tags/active'
        return axiosInstance.get(url)
    }
}
export default tagApi