import axiosInstance from "./axiosInstance"
const topicApi={
    getActive(){
        var url='topics/active'
        return axiosInstance.get(url)
    }

}
export default topicApi