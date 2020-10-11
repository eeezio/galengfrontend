<template>
  <div class="log" @mousewheel.prevent>
    <img :src="logBgUrl" id="log-bg" ondragstart="return false;">
  </div>
</template>

<script>
export default {
  name: "Log",

  data: function () {
    return {
      logBgUrl: require('../assets/back.png')
    }
  }
}
</script>

<style scoped>
#log-bg {
  position: absolute;

  width: 100%;
  height: 100%;
  margin: -1%;
  padding: -1%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
