<template>
  <div class="cg" @mousewheel.prevent>
    <img :src="cgBgUrl" id="cg-bg" ondragstart="return false;">
    <div class="cg-area">
      <div v-for="(item,index) in this.$Global.cgBtnContext" class="cg-image">
        <img class="cg-image-data" v-if="item.pageId==currentPage" :src="item.image" @click="showCg(item)">
      </div>
    </div>
    <ul class="cg-button-area">
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
      currentPage: 1,
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
        },]
    }
  },

  methods: {
    showCg(item) {
      if (item.haveData == false) {
        return;
      } else {

      }
    },
    cgBtnClick(index) {
      if (index <= 1) {
        this.currentPage = index + 1;
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
