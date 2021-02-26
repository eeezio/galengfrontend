<template>
  <div class="save" @mousewheel.prevent>
    <img :src="saveBgUrl" id="save-bg" ondragstart="return false;">
    <div class="save-area">
      <div v-for="(item,index) in this.savePage" class="save-button" @click="saveData(index)">
        <img :src="saveBtnUrl">
        <img class="save-data-image" v-if="item.image!=''" :src="item.image">
        <p class="save-text">{{ item.saveText }}</p>
      </div>
    </div>
    <ul class="save-button-area">
      <li v-for="(item,index) in saveButtonList" @mouseenter="saveOverBtn(item)" @mouseleave="saveOffBtn(item)">
        <img :src="item.btnSrc[item.btnIndex]" @click="saveBtnClick(index)"
             ondragstart="return false;">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Save",

  data() {
    return {
      saveBgUrl: require('../assets/saveload/back_save.png'),
      saveBtnUrl: require('../assets/saveload/btn_plate_back_off.png'),
      currentPage: 0,
      savePage: '',
      saveButtonList: [{
        btnSrc: [require('../assets/main2/b1_off.png'), require('../assets/main2/b1_on.png')],
        btnIndex: 0
      },
        {
          btnSrc: [require('../assets/main2/b2_off.png'), require('../assets/main2/b2_on.png')],
          btnIndex: 0
        }, {
          btnSrc: [require('../assets/saveload/btn_back_off.png'), require('../assets/saveload/btn_back_on.png')],
          btnIndex: 0
        }],
      saveText: '',
      saveImage: '',
    }
  },

  mounted() {
    this.savePage = this.$Global.saveBtnContext[0].saveInfo
  },

  methods: {
    saveData(i) {
      let processSaveBtn = this.$Global.saveBtnContext[this.currentPage]
      let params = this.$route.params
      this.saveText = params.saveText
      this.saveImage = params.saveImage

      if (this.saveText.length >= 10) {
        processSaveBtn.saveInfo[i].saveText = this.saveText.slice(0, 20)
        processSaveBtn.saveInfo[i].saveText += '...'
      } else {
        processSaveBtn.saveInfo[i].saveText = this.saveText
      }
      processSaveBtn.saveInfo[i].image = this.saveImage

      let postSnapshootSave = {
        gameId: "galeng",//后期替换成从登录信息获取的数据
        account: "root",//后期替换成从登录信息获取的数据
        saveId: i,
        image: this.saveImage,
        saveText: this.saveText,
        savePage: this.currentPage,
        haveData: true
      }

      let postRuntimeSave = {
        gameId: "galeng",//后期替换成从登录信息获取的数据
        account: "root",//后期替换成从登录信息获取的数据
        saveId: i,
        savePage: this.currentPage,
        pc: 1,
        likAbility1: 0,
        likAbility2: 0,
        likAbility3: 0,
        storyBgmUrl: params.storyBgmUrl,
        storyDialogUrl: params.storyDialogUrl,
        storySeUrl: params.storySeUrl,
        storyText: params.storyText,
        storyMode: params.storyMode,
        selectMode: params.selectMode,
        storyVoiceUrl: params.storyVoiceUrl,
        storyBgUrl: params.storyBgUrl,
        storyBgAnimationName: params.storyBgAnimationName,
        storyBgAnimationDelay: params.storyBgAnimationDelay,
        storyBgAnimationDuration: params.storyBgAnimationDuration,
        storyBgShakeUp: params.storyBgAnimationDuration
      }
      if (processSaveBtn.saveInfo[i].haveData == false) {
        axios.post("http://localhost:8080/saveSnapshootSave", postSnapshootSave)
        axios.post("http://localhost:8080/saveRuntimeSave", postRuntimeSave)
      } else {
        axios.post("http://localhost:8080/updateSnapshootSave", postSnapshootSave)
        axios.post("http://localhost:8080/updateRuntimeSave", postRuntimeSave)
      }
      for (let j = 0; j < params.storyLihuiList.length; j++) {
        let processLihui = params.storyLihuiList[j]
        if (processLihui.lihuiSrc != null) {
          let lihuiSave = {
            savePage: this.currentPage,
            saveId: i,
            lihuiId: j,
            lihuiSrc: processLihui.lihuiSrc,
            animationName: processLihui.animationName,
            animationDuration: processLihui.animationDuration,
            animationDelay: processLihui.animationDelay,
            jumpUp: processLihui.jumpUp,
            rightMove: processLihui.rightMove,
            leftMove: processLihui.leftMove,
            account: "root",
            gameId: "galeng",
          }
          if (processSaveBtn.saveInfo[i].haveData == false) {
            axios.post("http://localhost:8080/saveLihuiSave", lihuiSave)
          } else {
            axios.post("http://localhost:8080/updateLihuiSave", lihuiSave)
          }
        }
      }
      processSaveBtn.saveInfo[i].haveData = true
      //强制页面渲染
      this.$forceUpdate()
    },

    saveOverBtn(item) {
      item.btnIndex = 1
    },

    saveOffBtn(item) {
      item.btnIndex = 0
    },

    saveBtnClick(index) {
      if (index <= 1) {
        this.currentPage = index;
        this.savePage = this.$Global.saveBtnContext[index].saveInfo
        this.$forceUpdate()
      } else {
        this.$router.go(-1)
      }
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

.save-button-area {
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

.save-button-area
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
