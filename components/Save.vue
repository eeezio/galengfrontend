<template>
  <div class="save" @mousewheel.prevent>
    <img :src="saveBgUrl" id="save-bg" ondragstart="return false;">
    <div class="save-area">
      <div v-for="(item,index) in saveBtnContext" class="save-button" @click="saveData(index)">
        <img :src="saveBtnUrl">
        <img class="save-data-image" v-if="item.image!=''" :src="item.image">
        <p class="save-text" v-if="item.haveData==1">{{ item.saveText }}</p>
      </div>

    </div>
    <div class="save-return-button" @mouseenter="saveOverBtn()" @mouseleave="saveOffBtn()" @click="saveClickReturn">
      <img :src="saveReturnButton.btnSrc[saveReturnButton.btnIndex]">
    </div>
  </div>
</template>

<script>
export default {
  name: "Save",


  data() {
    return {
      saveBgUrl: require('../assets/saveload/back_save.png'),
      saveBtnUrl: require('../assets/saveload/btn_plate_back_off.png'),
      saveReturnButton: {
        btnSrc: [require('../assets/saveload/btn_back_off.png'), require('../assets/saveload/btn_back_on.png')],
        btnIndex: 0
      },
      saveText: '',
      saveImage: '',
      saveBtnContext: [{
        haveData: 0,
        image: '',
        saveText: ''
      },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },
        {
          haveData: 0,
          image: '',
          saveText: ''
        },],
    }
  },

  methods: {
    saveData(i) {
      this.saveText = this.$route.params.saveText
      this.saveImage = this.$route.params.saveImage
      this.saveBtnContext[i].haveData = 1
      if (this.saveText.length >= 10) {
        this.saveBtnContext[i].saveText = this.saveText.slice(0, 20)
        this.saveBtnContext[i].saveText += '...'
      } else {
        this.saveBtnContext[i].saveText = this.saveText
      }
      this.saveBtnContext[i].image = this.saveImage
    },

    saveOverBtn() {
      this.saveReturnButton.btnIndex = 1
    },

    saveOffBtn() {
      this.saveReturnButton.btnIndex = 0
    },

    saveClickReturn() {
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped>
#save-bg {
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

.save-area {
  position: absolute;

  top: 20%;
  bottom: 10%;
  width: 100%;
  left: 2%;
}

.save-button {
  position: relative;
  float: left;
}

.save-data-image {
  position: absolute;

  top: 10%;
  left: 5%;
  width: 40%;
  height: 80%;
}

.save-text {
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

.save-return-button {
  position: absolute;
  bottom: 1%;
  left: 85%;
}
</style>
