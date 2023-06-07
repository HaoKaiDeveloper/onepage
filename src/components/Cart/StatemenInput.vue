<template>
  <div class="statement">
    <label for="statement_signed">
      <input
        type="checkbox"
        id="statement_signed"
        :checked="check"
        @change="signedStatement"
      />
      本人已閱讀並同意
    </label>
    <button type="button" @click="toggleStatement(true)">
      個人資料保護聲明
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["signed-statement", "statement-popup"],
  props: ["userInfo"],
  setup(props, { emit }) {
    const check = ref(false);

    if (props.userInfo) {
      check.value = props.userInfo.signed;
      emit("signed-statement", props.userInfo.signed);
    }

    function signedStatement(e) {
      emit("signed-statement", e.target.checked);
    }

    function toggleStatement(val) {
      emit("statement-popup", val);
    }
    return {
      check,
      toggleStatement,
      signedStatement,
    };
  },
};
</script>

<style scoped lang="scss">
.statement {
  font-size: var(--f-mi);
  width: 80%;
  margin: 2em auto;

  button {
    color: blue;
    border-bottom: 0.5px solid blue;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>
