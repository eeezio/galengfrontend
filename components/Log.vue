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
      logText: '',
    }
  },

  mounted: function () {
    this.logText = this.queryLogText();
  },

  updated() {
    this.scrollDown()
  },

  methods: {
    scrollDown() {
      this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
    },

    queryLogText() {
      return ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '计算机科学，研究计算机及其周围各种现象和规律的科学，亦即研究计算机系统结构、程序系统（即软件）、人工智能以及计算本身的性质和问题的学科。', '计算机科学是一门包含各种各样与计算和信息处理相关主题的系统学科，从抽象的算法分析、形式化语法等等，到更具体的主题如编程语言、程序设计、软件和硬件等。', '计算机科学分为理论计算机科学和实验计算机科学两个部分。后者常称为“计算机科学”而不冠以“实验”二字。', '前者有其他名称，如计算理论、计算机理论、计算机科学基础、计算机科学数学基础等。数学文献中一般指理论计算机科学。',]
    }
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
