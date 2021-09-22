<template>
  <div class="main">
    <div class="main__chevron">
      <img
        src="@/assets/left-chevron.png"
        alt="left chevron"
        @click="prevPage"
      />
    </div>
    <div class="main__list">
      <p>Page <b>{{ pageNumber }} </b></p>
      <img
        class="main__list-item"
        v-for="item in imgList"
        :key="item.id"
        :src="item.cropped_picture"
        alt="image"
        @click="showImage(item.id)"
      />
    </div>
    <div class="main__chevron">
      <img
        src="@/assets/right-chevron.png"
        alt="right chevron"
        @click="nextPage"
      />
    </div>
    <modal v-if="showModal" @close="showModal = false" :iData="picId" />
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: { Modal },
  setup() {
    const store = useStore();
    const pageNumber = ref(1);
    const picId = ref(0);
    const showModal = ref(false);
    const totalPages = computed(() => store.getters.totalCount / 10);
    const imgList = computed(() => store.getters.imagesList);
    const prevPage = () => {
      if (pageNumber.value > 1) {
        pageNumber.value -= 1;
      }
    };
    const nextPage = () => {
      pageNumber.value += 1;
    };
    const showImage = (id) => {
      picId.value = id;
      showModal.value = true;
    };
    watch(pageNumber, () => {
      store.dispatch("fetchImages", pageNumber.value);
    });
    onMounted(() => {
      store.dispatch("fetchImages", pageNumber.value);
    });
    return {
      imgList,
      pageNumber,
      showModal,
      totalPages,
      showImage,
      picId,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  &__chevron {
    flex-direction: column;
    align-self: center;
    text-align: center;
    width: 20%;
    cursor: pointer;
    img {
      width: 48px;
      height: 48px;
    }
  }
  &__list {
    flex-direction: row;
    align-self: center;
    text-align: center;
    flex-wrap: wrap;
    width: 80%;
    &-item {
      margin: 8px;
      height: 200px;
      width: 200px;
      cursor: pointer;
    }
  }
}
</style>
