<template>
  <swiper
    :modules="modules"
    :space-between="10"
    :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMounseEnter: true,
    }"
    v-if="imgs.length > 0"
    class="img_box"
  >
    <div class="swiper-navigation">
      <div class="prevArrow">
        <v-icon icon="mdi-chevron-left" />
      </div>
      <div class="nextArrow">
        <v-icon icon="mdi-chevron-right" />
      </div>
    </div>
    <swiper-slide v-for="(img, i) in imgs" :key="i">
      <img :src="img.url" alt="productimg" />
    </swiper-slide>
  </swiper>

  <div v-else class="img_box"></div>
</template>

<script>
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  props: ["imgs"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination],
    };
  },
};
</script>

<style scoped>
.img_box {
  width: 100%;
  height: 100%;
  background-color: var(--grey-50);
  border-radius: 12px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-navigation {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
}
.swiper-navigation div {
  font-size: 3em;
  padding: 0.1em;
  border-radius: 0.2em;
  color: #fff;
  cursor: pointer;
}
@media screen and (max-width: 500px) {
  .swiper-navigation div {
    display: none;
  }
}
</style>
