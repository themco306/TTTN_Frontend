import axiosInstance from "./axiosInstance"
const postApi={
    getPostActive(){
        var url='posts/active'
        return axiosInstance.get(url)
    },
    getPostBySlug(slug){
        var url='posts/slug/'+slug
        return axiosInstance.get(url)
    },
    getSame(slug){
        var url='posts/same/'+slug
        return axiosInstance.get(url)
    },
    getFilter(params){
        var url='posts/filter'
        return axiosInstance.get(url,{params})
    },

}
export default postApi