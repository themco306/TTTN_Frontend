import axiosInstance from "./axiosInstance"
const productApi={
    getSearch(params){
        var url='products/search'
        return axiosInstance.get(url,{params})
    },
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