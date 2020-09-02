<template>
  <div id="app">
    <FamilyView />
  </div>
</template>

<script>
import FamilyView from "@/views/FamilyView.vue";

export default {
  name: "App",
  components: {
    FamilyView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
}

html * {
  background: #57c4e5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
