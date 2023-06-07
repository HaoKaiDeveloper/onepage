<template>
  <section>
    <transition>
      <div v-show="show">
        <h1>請用手機掃描QR code 付款</h1>
        <QrcodeVue :value="checkoutUrl" :size="200" level="H" />
        <button @click="closePopup">關閉</button>
      </div>
    </transition>
  </section>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { ref, watch } from "vue";
export default {
  props: ["checkoutUrl"],
  components: { QrcodeVue },
  setup(props, { emit }) {
    const show = ref(false);

    function closePopup() {
      show.value = false;
      setTimeout(() => {
        emit("close-popup");
      }, 250);
    }

    watch(
      () => props.checkoutUrl,
      () => {
        if (props.checkoutUrl) {
          show.value = true;
        }
      }
    );

    return {
      closePopup,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

div {
  width: 100%;
  max-width: 600px;
  min-width: 250px;
  height: 80%;
  background-color: var(--grey-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  padding-bottom: 1.5em;

  h1 {
    width: 100%;
    display: block;
    font-size: var(--f-l);
    background-color: var(--orange-2);
    text-align: center;
    padding: 1em;
  }

  button {
    background-color: var(--orange-1);
    font-size: var(--f-mi);
    color: var(--grey-1);
    padding: 0.2em 1em;
    border-radius: 20px;
  }
}

.v-enter-active {
  animation: popup 0.25s ease;
  /* transition: all 0.25s ease-out; */
}

.v-leave-active {
  animation: popup 0.25s ease reverse;
  /* transition: all 0.25s ease-in; */
}
/* 
.v-enter-from,
.v-leave-to {
  opacity: 0.5;
  transform: scale(0);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
} */

@keyframes popup {
  0% {
    opacity: 0.5;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
