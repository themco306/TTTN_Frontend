import axiosInstance from "./axiosInstance"
const menuApi={
    getAllHeader(){
        var url='menus/header'
        return axiosInstance.get(url)
    },
    getSubMenu(id){
        var url='menus/sub/'+id
        return axiosInstance.get(url)
    }

}
export default menuApi