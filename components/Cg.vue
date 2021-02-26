<template>
  <div class="cg" @mousewheel.prevent>
    <img :src="showCgList[showCgPage]" id="show-cg" @click="showCg()">
    <img :src="cgBgUrl" id="cg-bg" ondragstart="return false;">
    <div v-if="!showCgmode" class="cg-area">
      <div v-for="(item,index) in this.cgImagePage" class="cg-image">
        <img class="cg-image-data" :src="item.image" @click="setCg(item)">
      </div>
    </div>
    <ul v-if="!showCgmode" class="cg-button-area">
      <li v-for="(item,index) in cgButtonList" @mouseenter="cgOverBtn(item)" @mouseleave="cgOffBtn(item)">
        <img :src="item.btnSrc[item.btnIndex]" @click="cgBtnClick(index)" ondragstart="return false;">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Cg",

  data() {
    return {
      cgBgUrl: require("../assets/cg/back.png"),

      cgButtonList: [{
        btnSrc: [require('../assets/main2/b1_off.png'), require('../assets/main2/b1_on.png')],
        btnIndex: 0
      },
        {
          btnSrc: [require('../assets/main2/b2_off.png'), require('../assets/main2/b2_on.png')],
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/saveload/btn_back_off.png'), require('../assets/saveload/btn_back_on.png')],
          btnIndex: 0
        },],

      cgImagePage: this.$Global.cgBtnContext[0].cgInfo,

      showCgList: "",
      showCgNum: 0,
      showCgPage: 0,
      showCgmode: false
    }
  },

  methods: {
    setCg(item) {
      if (item.haveData == false) {
        return;
      } else {
        this.showCgmode = true
        this.showCgList = item.realCgUrl
        this.showCgNum = item.cgNum
      }
    },
    showCg() {
      this.showCgPage += 1
      if (this.showCgPage == this.showCgNum) {
        this.showCgList = [];
        this.showCgNum = 0;
        this.showCgPage = 0;
        this.showCgmode = false
      }
    },
    cgBtnClick(index) {
      if (index <= 1) {
        this.cgImagePage=this.$Global.cgBtnContext[index].cgInfo
        this.$forceUpdate()
      } else {
        this.$router.go(-1)
      }
    },
    cgOverBtn(item) {
      item.btnIndex = 1;
    },
    cgOffBtn(item) {
      item.btnIndex = 0;
    }
  },
}
</script>

<style scoped>
#show-cg {
  position: absolute;
  margin: -1%;
  padding: -1%;
}

.cg {
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

.cg-area {
  position: absolute;

  top: 20%;
  bottom: 10%;
  width: 100%;
  left: 2%;
}

.cg-image {
  position: relative;
  float: left;

  padding-right: 5%;
  padding-top: 5%;
}

.cg-button-area {
  position: absolute;

  width: 100%;
  height: 10%;
  left: 60%;
  bottom: 5%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /*border-style: solid;*/
  /*border-color: red;*/
}

.cg-button-area
li {
  position: relative;

  bottom: -50%;
  padding-right: 5%;
  float: left;

  list-style: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
