import { createStore } from "vuex";
import imageService from "../services/imageService";

export default createStore({
  state: {
    images: [],
    totalCount: 0,
    imageDetails: [],
  },
  getters: {
    imagesList: (state) => state.images,
    totalCount: (state) => state.totalCount,
    imageDetails: (state) => state.imageDetails,
    imageIndex: (state) => (id) => state.images.findIndex((x) => x.id === id),
    imageNav: (state) => (index) => {
      if (index > 0 && index < state.images.length) {
        return state.images[index].id;
      } else {
        return "";
      }
    },
  },
  mutations: {
    setImages(state, data) {
      state.images = data;
    },
    setImageDetails(state, data) {
      state.imageDetails = data;
    },
  },
  actions: {
    async fetchImages({ commit, dispatch }, pageNumber) {
      try {
        const imageList = await imageService.getImagesList(pageNumber);
        commit("setImages", imageList.data.pictures);
      } catch (err) {
        dispatch("Alert/error", err);
      }
    },
    async fetchImageDetails({ commit, dispatch }, id) {
      try {
        const imageData = await imageService.getImage(id);
        commit("setImageDetails", imageData.data);
      } catch (err) {
        dispatch("Alert/error", err);
      }
    },
  },
  modules: {},
});
