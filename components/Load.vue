<template>
  <div class="load" @mousewheel.prevent>
    <img :src="loadBgUrl" id="load-bg" ondragstart="return false;">
    <div class="load-area">
      <div v-for="(item,index) in this.$Global.saveBtnContext" class="load-button" @click="loadData(index)">
        <img :src="loadBtnUrl">
        <img class="load-data-image" v-if="item.image!=''" :src="item.image">
        <p class="load-text" v-if="item.haveData==1">{{ item.saveText }}</p>
      </div>

    </div>
    <div class="load-return-button" @mouseenter="loadOverBtn()" @mouseleave="loadOffBtn()" @click="loadClickReturn">
      <img :src="loadReturnButton.btnSrc[loadReturnButton.btnIndex]">
    </div>
  </div>
</template>

<script>
export default {
  name: "Load",


  data() {
    return {
      loadBgUrl: require('../assets/saveload/back_load.png'),
      loadBtnUrl: require('../assets/saveload/btn_plate_back_off.png'),
      loadReturnButton: {
        btnSrc: [require('../assets/saveload/btn_back_off.png'), require('../assets/saveload/btn_back_on.png')],
        btnIndex: 0
      },
      loadText: '',
      loadImage: '',
    }
  },

  methods: {
    loadData(i) {
    },

    loadOverBtn() {
      this.loadReturnButton.btnIndex = 1
    },

    loadOffBtn() {
      this.loadReturnButton.btnIndex = 0
    },

    loadClickReturn() {
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped>
#load-bg {
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

.load-area {
  position: absolute;

  top: 20%;
  bottom: 10%;
  width: 100%;
  left: 2%;
}

.load-button {
  position: relative;
  float: left;
}

.load-data-image {
  position: absolute;

  top: 10%;
  left: 5%;
  width: 40%;
  height: 80%;
}

.load-text {
  position: absolute;
  top: 8%;
  left: 50%;
  right: 10%;

  color: aliceblue;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.load-return-button {
  position: absolute;
  bottom: 1%;
  left: 85%;
}
</style>
