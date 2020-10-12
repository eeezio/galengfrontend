<template>
  <div class="log" @mousewheel.prevent>
    <img :src="logBgUrl" id="log-bg" ondragstart="return false;">
    <div class="log-scrollbar">
      <el-scrollbar ref="myScrollbar">
        <ul class="lists">
          <div class="log-dialog" v-for="item in logText">
            <img :src="require('../assets/main2/tip_meswindow_back.png')" ondragstart="return false;">
            <p class="log-text">
              {{ item }}
            </p>
          </div>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Log",
  data: function () {
    return {
      logBgUrl: require('../assets/back.png'),
      logLength: '',
      logText: '',
    }
  },

  mounted: function () {
    this.logText = this.$route.params.logText;
    this.logLength = this.$route.params.logLength;

  },

  updated() {
    this.scrollDown()
  },

  methods: {
    scrollDown() {
      this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
    },

  }
}
</script>

<style scoped>
#log-bg {
  position: absolute;

  width: 100%;
  height: 100%;
  top: 0%;
  margin: -1%;
  padding: -1%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.log-dialog {
  position: relative;
}


.log-text {
  position: absolute;

  top: -10%;
  left: 10%;
  right: 10%;

  font-size: 25px;
  color: aliceblue;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/*默认是静态定位，什么是静态定位？？为什么改了定位方式以后滑动条无法出现？*/
.log-scrollbar {
  max-width: 100%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/*默认是静态定位，什么是静态定位？？为什么改了定位方式以后滑动条无法出现？*/
.lists {
  margin: 0;
  padding: 0;
  max-height: 535px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
