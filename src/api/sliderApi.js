import axiosInstance from "./axiosInstance"
const sliderApi={
    getAll(){
        var url='sliders/active'
        return axiosInstance.get(url)
    }

}
export default sliderApi