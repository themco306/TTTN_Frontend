import axiosInstance from "./axiosInstance"
const productApi={
    getAllByTag(id){
        var url='products/tag/'+id
        return axiosInstance.get(url)
    },
    

}
export default productApi