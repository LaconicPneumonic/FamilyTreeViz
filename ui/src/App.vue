<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html * {
  background: #57c4e5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, font-size .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  font-size: .005vh;
}
</style>
