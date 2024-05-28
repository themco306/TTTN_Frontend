import axiosInstance from "./axiosInstance"
const rateApi={
    add(data){
        var url='rates'
        return axiosInstance.post(url,data)
    },
    getByPId(id){
        var url='rates/'+id
        return axiosInstance.get(url)
    },
    getRateLike(id){
        var url='rates/rateLike/'+id
        return axiosInstance.get(url)
    },
    action(rateId,isLike){
        var url=`rates/action/${rateId}/${isLike}`
        return axiosInstance.put(url)
    },
}
export default rateApi