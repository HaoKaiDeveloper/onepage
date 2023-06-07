<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Poppins:wght@300;400;500&display=swap");
:root {
  --orange-1: #ff5722;
  --orange-2: #ffccbc;

  --grey-1: #fafafa;
  --grey-2: #eeeeee;
  --grey-3: #9e9e9e;
  --grey-4: #424242;
  --grey-5: #212121;

  --back-color: #fff;
  --f-xl: 30px;
  --f-l: 20px;
  --f-mi: 18px;
  --f-s: 15px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 62.5%;
  font-family: "Noto Sans TC", sans-serif;
  font-family: "Poppins", sans-serif;
  background-color: var(--back-color);
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  margin: 80px 0 5px 0;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: var(--primary-1);
}
button {
  touch-action: none;
}

li {
  list-style: none;
}
</style>
