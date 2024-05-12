import axiosInstance from "./axiosInstance"
const webInfoApi={
    getFirst(params){
        var url='web-infos'
        return axiosInstance.get(url,{params})
    }
}
export default webInfoApi