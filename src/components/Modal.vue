<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header__info">
            <span class="modal-header__author">Author: {{ imgData.author }}| </span>
            <span class="modal-header__camera">Camera: {{ imgData.camera }}| </span>
            <span class="modal-header__tag">Tags: {{ imgData.tags }}</span>
          </div>
          <div class="modal-header__info">
            <button class="modal-header__info-btn">Share</button>
          </div>
          <div class="modal-header__close">
            <img src="@/assets/close-button.png" alt="close" @click="$emit('close')" />
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-body__chevron">
            <img
              src="@/assets/left-chevron.png"
              alt="left chevron"
              @click="prevImage"
            />
          </div>
          <img
            class="modal-body__image"
            :src="imgData.full_picture"
            :width="width"
            alt=""
          />
          <div class="modal-body__chevron">
            <img
              src="@/assets/right-chevron.png"
              alt="right chevron"
              @click="nextImage"
            />
          </div>
        </div>

        <div class="modal-footer">
          <div class="modal-footer__scale">
            <input type="range" v-model="scale" min="0" max="40" step="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch, onMounted, computed } from "vue";

export default {
  props: {
    iData: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const scale = ref(4);
    const width = ref(300);
    const photoId = ref(props.iData);
    const imgData = computed(() => store.getters.imageDetails);
    const nextImage = () => {
      const currentIndex = store.getters.imageIndex(photoId.value);
      if (store.getters.imageNav(currentIndex + 1)) {
        photoId.value = store.getters.imageNav(currentIndex + 1);
      }
    };
    const prevImage = () => {
      const currentIndex = store.getters.imageIndex(photoId.value);
      if (store.getters.imageNav(currentIndex - 1)) {
        photoId.value = store.getters.imageNav(currentIndex - 1);
      }
    };
    onMounted(() => {
      store.dispatch("fetchImageDetails", photoId.value);
    });
    watch(photoId, () => {
      store.dispatch("fetchImageDetails", photoId.value);
    });
    watch(scale, () => {
      width.value = scale.value * 25;
    });
    return {
      imgData,
      nextImage,
      prevImage,
      scale,
      width,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 4500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: darkblue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__author {
    color: red;
  };
  &__camera {
    color: green;
  };
  &__tags {
    color: blue;
  };
  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-btn {
      outline: none;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 40px;
      width: 75px;
      cursor: pointer;
      background-color: dodgerblue;
      color: #fff;
    }
  }
  &__close {
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.modal-body {
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__chevron {
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
  &__image {
    object-fit: contain;
  }
}

.modal-footer {
  &__scale {
    width: 100%;
    display: flex;
    justify-content: center;
    }
}
</style>
