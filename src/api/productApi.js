import axiosInstance from "./axiosInstance"
const productApi={
    getFilter(params){
        var url='products/filter'
        return axiosInstance.get(url,{params})
    },
    getAllByTag(id){
        var url='products/tag/'+id
        return axiosInstance.get(url)
    },
    getBySlug(slug){
        var url='products/slug/'+slug
        return axiosInstance.get(url)
    },
    getSame(slug){
        var url='products/same/'+slug
        return axiosInstance.get(url)
    },

}
export default productApi