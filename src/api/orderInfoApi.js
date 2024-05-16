
import axiosInstance from "./axiosInstance"
export const orderInfoApi = {
    getAll(){
        var url='orderInfos'
        return axiosInstance.get(url)
    },
    update(id,data){
        var url='orderInfos/'+id
        return axiosInstance.put(url,data)
    },
    create(data){
        var url='orderInfos'
        return axiosInstance.post(url,data)
    },
    delete(id){
        var url='orderInfos/'+id
        return axiosInstance.delete(url)
    },
}