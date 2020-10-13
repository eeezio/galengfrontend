<template>
  <div class="save" @mousewheel.prevent>
    <img :src="saveBgUrl" id="save-bg" ondragstart="return false;">
    <div class="save-area">
      <div v-for="(item,index) in saveBtnContext" class="save-button" @click="saveData(index)">
        <img :src="saveBtnUrl">
        <img class="save-data-image" v-if="item.haveData==1" :src="item.image">
        <p class="save-text" v-if="item.haveData==1">{{ item.saveText }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Save",

  mounted() {
    this.saveText = this.$route.params.saveText
  },

  data() {
    return {
      saveBgUrl: require('../assets/saveload/back_save.png'),
      saveBtnUrl: require('../assets/saveload/btn_plate_back_off.png'),
      saveText: '',
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
      this.saveBtnContext[i].haveData = 1
      if (this.saveText.length >= 10) {
        this.saveBtnContext[i].saveText = this.saveText.slice(0, 20)
        this.saveBtnContext[i].saveText += '...'
      } else {
        this.saveBtnContext[i].saveText = this.saveText
      }
      console.log(this.saveBtnContext[i].saveText)
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
  left: 10%;
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
</style>
