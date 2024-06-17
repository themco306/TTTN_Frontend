import axiosInstance from "./axiosInstance"
const rateApi={
    add(data){
        var url='rates'
        return axiosInstance.post(url,data)
    },
    changeStatus(id){
        var url='rates/'+id+"/status"
        return axiosInstance.put(url)
    },
    report(id){
        var url='rates/report/'+id
        return axiosInstance.post(url)
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
    addFiles(id, data) {
        var url = 'ratefiles/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.post(url, data, config);
    },
    updateFiles(id, data) {
        var url = 'ratefiles/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.put(url, data, config);
    }
}
export default rateApi