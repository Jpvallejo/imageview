import Api from './apiService'

const getImagesList = (pageNo) => Api.get(`/images?page=${pageNo}`)
const getImage = (id) => Api.get(`/images/${id}`)


export default {
    getImagesList,
    getImage,
}