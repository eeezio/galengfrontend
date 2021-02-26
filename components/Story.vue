<template>
  <div class="story" @mousewheel.prevent ref="story">
    <audio :src="storyBgmUrl" id="story-bgm" autoplay="autoplay" loop="loop"></audio>
    <audio :src="storyText.voiceUrl" id="story-voice" autoplay="autoplay"></audio>
    <audio :src="storySeUrl" id="story-se" autoplay="autoplay"></audio>
    <!--    crossorigin="anonymous" 为了解决跨域问题-->
    <img :src="storyFloorUrl" id="story-floor" crossorigin="anonymous">
    <img :src="storyBg.url" id='story-bg' :style="{
    animationName: storyBg.animationName,
    animationDuration: storyBg.animationDuration,
    animationDelay: storyBg.animationDelay,
    //css变量在vue中使用这种方式与data绑定
    '--shake-up':storyBg.shakeUp,
    }" ondragstart="return false;" crossorigin="anonymous">
    <ul class="story-lihui-area">
      <li v-for="(item,index) in storyLihuiList" :style="{
          position: 'relative',
          height: '100%',
          width: '19%',
          float: 'left',
          listStyle: 'none',
          animationName: item.animationName,
          animationDuration: item.animationDuration,
          animationDelay: item.animationDelay,
          //控制动画后停止在该位置
          animationFillMode:'forwards',
          //css变量在vue中使用这种方式与data绑定
          '--jump-up':item.jumpUp,
          '--right-move':item.rightMove,
          '--left-move':item.leftMove
          }">
        <img :src="item.lihuiSrc" ondragstart="return false;" crossorigin="anonymous">
      </li>
    </ul>
    <!--    test case-->
    <div v-if="storyMode==true" class="story-dialog-area" @click="nextInstruct(),testCase()">
      <img :src=storyDialogUrl ondragstart="return false;" crossorigin="anonymous">
      <p v-if="stopAuto==false" class="story-text">
        {{ storyText.autoText }}
      </p>
      <p v-else-if="dialogClickCount%2==1" class="story-text">
        {{ storyText.rollText }}
      </p>
      <p v-else class="story-text">
        {{ storyText.immText }}
      </p>
    </div>
    <ul class="story-button-area">
      <li v-for="(item,_) in storyButtonList" @mouseenter="storyOverBtn(item)" @mouseleave="storyOffBtn(item)">
        <!--        注释掉下面一句的原因是，为了让按钮音效正常播放-->
        <!--        <router-link :to=item.routeId @click="storyBtnClick">-->
        <img :src="item.btnSrc[item.btnIndex]" @click="storyBtnClick(item)" ondragstart="return false;">
        <!--        </router-link>-->
      </li>
    </ul>
    <img :src="storyMask.maskUrl" id="story-mask" :style="{
         animationName: storyMask.animationName,
         animationDuration: storyMask.animationDuration,
         animationDelay: storyMask.animationDelay,
         animationFillMode: 'forwards'
         }"
         ondragstart="return false;">
    <ul v-if="selectMode" class="select-button-area">
      <li v-for="(item,index) in selectBtnList" @mouseenter="storyOverBtn(item)" @mouseleave="storyOffBtn(item)"
          @click="selectBtnClick(index)">
        <img :src="item.btnSrc[item.btnIndex]" ondragstart="return false;">
        <p class="select-text">
          {{ item.selectText }}
        </p>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import html2canvas from 'html2canvas'

export default {
  name: "Story",
  data() {
    return {
      // storyBg: {
      //   url: require('../assets/bg/0229.png'),
      //   animationName: null,
      //   animationDuration: null,
      //   animationDelay: null,
      //   shakeUp: null,
      // },
      // storyBgmUrl: require('../assets/bgm/bgm01.ogg'),
      //
      // storyDialogUrl: require('../assets/main2/tip_meswindow_back.png'),
      //
      // storySeUrl: require('../assets/se/0001.ogg'),

      storyBg: {
        url: null,
        animationName: null,
        animationDuration: null,
        animationDelay: null,
        shakeUp: null,
      },

      storyBgmUrl: null,

      storyDialogUrl: null,

      storySeUrl: null,

      storyMask: {maskUrl: null, animationName: null, animationDelay: null, animationDuration: null},

      storyFloorUrl: require('../assets/main2/black.png'),

      // storyText: {rollText: null, immText: null, autoText: null, voiceUrl: require('../assets/voice/fum_omake_00035.ogg')},
      storyText: {rollText: null, immText: null, autoText: null, voiceUrl: null},

      storyBackEndText: null,

      textSpeed: 60,//这个应该从global处获取

      dialogClickCount: 0,

      storyButtonList: [
        {
          btnSrc: [require('../assets/main2/b1_off.png'), require('../assets/main2/b1_on.png')],
          routeId: 'log',
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/main2/b2_off.png'), require('../assets/main2/b2_on.png')],
          routeId: 'save',
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/main2/b3_off.png'), require('../assets/main2/b3_on.png')],
          routeId: 'load',
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/main2/b4_off.png'), require('../assets/main2/b4_on.png')],
          routeId: 'config',
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/main2/b5_off.png'), require('../assets/main2/b5_on.png')],
          routeId: 'auto',
          btnIndex: 0
        },
        {
          btnSrc: [require('../assets/saveload/btn_page06_off.png'), require('../assets/saveload/btn_page06_on.png')],
          routeId: 'title',
          btnIndex: 0
        },
      ],

      storyLihuiList: [
        {
          // lihuiSrc: require('../assets/lihui/0132.png'),
          // animationName: null,
          // animationDuration: null,
          // animationDelay: null,
          // jumpUp: null,
          // rightMove: null,
          // leftMove: null
          lihuiSrc: null,
          animationName: null,
          animationDuration: null,
          animationDelay: null,
          jumpUp: null,
          rightMove: null,
          leftMove: null
        },
        {
          lihuiSrc: null,
          animationName: null,
          animationDuration: null,
          animationDelay: null,
          jumpUp: null,
          rightMove: null,
          leftMove: null
        },
        {
          // lihuiSrc: require('../assets/lihui/0320.png'),
          // animationName: 'jump-up,jump-down',
          // animationDuration: '0.3s,0.3s',
          // animationDelay: '0s,0.3s',
          // jumpUp: '10%',
          // rightMove: '20%',
          // leftMove: null
          lihuiSrc: null,
          animationName: null,
          animationDuration: null,
          animationDelay: null,
          jumpUp: null,
          rightMove: null,
          leftMove: null
        },
        {
          lihuiSrc: null,
          animationName: null,
          animationDuration: null,
          animationDelay: null,
          jumpUp: null,
          rightMove: null,
          leftMove: null
        },
        {
          // lihuiSrc: require('../assets/lihui/0445.png'),
          // animationName: null,
          // animationDuration: null,
          // animationDelay: null,
          // jumpUp: null,
          // rightMove: null,
          // leftMove: null
          lihuiSrc: null,
          animationName: null,
          animationDuration: null,
          animationDelay: null,
          jumpUp: null,
          rightMove: null,
          leftMove: null
        }
      ],

      selectBtnList: [
        {
          selectText: "大家好",
          btnIndex: 0,
          btnSrc: [require("../assets/select/btn_select_off.png"), require("../assets/select/btn_select_over.png")]
        }, {
          selectText: "欢迎大家陪我",
          btnIndex: 0,
          btnSrc: [require("../assets/select/btn_select_off.png"), require("../assets/select/btn_select_over.png")]
        }, {
          selectText: "继续重修大学计算机",
          btnIndex: 0,
          btnSrc: [require("../assets/select/btn_select_off.png"), require("../assets/select/btn_select_over.png")]
        }
      ],

      //检测当前是否滚动播完了
      flag: 1,

      stopAuto: true,

      storySaveImgUrl: null,

      storyMode: true,

      selectMode: false,

      //index为没用的测试变量，将来一定要删掉
      index: 0,
      testText: ['计算机科学，研究计算机及其周围各种现象和规律的科学，亦即研究计算机系统结构、程序系统（即软件）、人工智能以及计算本身的性质和问题的学科。',
        '计算机科学是一门包含各种各样与计算和信息处理相关主题的系统学科，从抽象的算法分析、形式化语法等等，到更具体的主题如编程语言、程序设计、软件和硬件等。',
        '计算机科学分为理论计算机科学和实验计算机科学两个部分。后者常称为“计算机科学”而不冠以“实验”二字。',
        '前者有其他名称，如计算理论、计算机理论、计算机科学基础、计算机科学数学基础等。数学文献中一般指理论计算机科学。',
        '麦克风杰克鸟',
        '计算机科学，研究计算机及其周围各种现象和规律的科学，亦即研究计算机系统结构、程序系统（即软件）、人工智能以及计算本身的性质和问题的学科。',
        '计算机科学是一门包含各种各样与计算和信息处理相关主题的系统学科，从抽象的算法分析、形式化语法等等，到更具体的主题如编程语言、程序设计、软件和硬件等。',
        '计算机科学分为理论计算机科学和实验计算机科学两个部分。后者常称为“计算机科学”而不冠以“实验”二字。',
        '前者有其他名称，如计算理论、计算机理论、计算机科学基础、计算机科学数学基础等。数学文献中一般指理论计算机科学。'],
      testCaseMask: [require('../assets/bg/0072.png'), require('../assets/bg/0073.png')],
      testTextIndex: 0,
    }
  },

  updated() {
    document.getElementById("story-bgm").volume = this.$Global.bgmVolume * 0.01;
    document.getElementById("story-se").volume = this.$Global.seVolume * 0.01;
    document.getElementById("story-voice").volume = this.$Global.voiceVolume * 0.01;
    this.textSpeed = this.$Global.textSpeed
  },
  //钩子函数
  mounted() {
    document.getElementById("story-bgm").volume = this.$Global.bgmVolume * 0.01;
    document.getElementById("story-se").volume = this.$Global.seVolume * 0.01;
    document.getElementById("story-voice").volume = this.$Global.voiceVolume * 0.01;
    this.textSpeed = this.$Global.textSpeed
    let runtimeSave = this.$route.params.runtimeSave
    let lihuiSave = this.$route.params.lihuiSave
    window.addEventListener("mouseup", this.setAuto);
    this.storyBackEndText = runtimeSave.storyText
    this.storyMode = runtimeSave.storyMode
    this.selectMode = runtimeSave.selectMode
    this.storyText.voiceUrl = runtimeSave.storyVoiceUrl
    this.storySeUrl = runtimeSave.storySeUrl
    this.storyDialogUrl = runtimeSave.storyDialogUrl
    this.storyBgmUrl = runtimeSave.storyBgmUrl
    this.storyBg.url = runtimeSave.storyBgUrl
    this.storyBg.shakeUp = runtimeSave.storyBgShakeUp
    this.storyBg.animationDuration = runtimeSave.storyBgAnimationDuration
    this.storyBg.animationDelay = runtimeSave.storyBgAnimationDelay
    this.storyBg.animationName = runtimeSave.storyBgAnimationName
    for (let j = 0; j < lihuiSave.length; j++) {
      this.storyLihuiList[lihuiSave[j].lihuiId] = lihuiSave[j]
    }
    this.nextInstruct()
  },


  methods: {
//TODO
    selectBtnClick(index) {
      console.log(index)
    },

    sleep(numberMillis) {
      let now = new Date();
      let exitTime = now.getTime() + numberMillis;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
          return;
      }
    },

    setAuto() {
      this.stopAuto = true;
    }
    ,

    /**
     * 通过网络请求获取下一句文本
     */
    queryNextSentence() {
      return this.testText[this.testTextIndex++]
    }
    ,


    /**
     * 展示下一句游戏文本
     */
    nextInstruct() {
      this.dialogClickCount += 1
      //滚动播完或者当前是立即显示，即可获取下一条文本
      if (this.flag == 1 || this.dialogClickCount % 2 == 0) {
        this.storyText.immText = this.storyBackEndText;
        this.storyBackEndText = this.queryNextSentence();
      }
      if (!this.stopAuto) {
        this.autoNextSentence(0);
      }
      if (this.dialogClickCount % 2 == 1 && this.stopAuto) {
        this.rollNextSentence(0)
      }
      this.flag = 0
      //类似懒加载
    }
    ,

    rollNextSentence(i) {
      if (this.dialogClickCount % 2 != 1) {
        i = 0
      }
      if (i <= this.storyBackEndText.length) {
        this.storyText.rollText = this.storyBackEndText.slice(0, i++);
        setTimeout(() => {
          this.rollNextSentence(i);
        }, this.textSpeed);
      } else {
        //滚动播完了，可以获取新文本了
        this.flag = 1
        //避免刷新成旧的immtext文本
        this.storyText.immText = this.storyBackEndText;
        //滚动播完了，下次要滚动开始
        this.dialogClickCount = 0
      }
    }
    ,

    autoNextSentence(i) {
      if (i <= this.storyBackEndText.length) {
        this.storyText.autoText = this.storyBackEndText.slice(0, i++);
        setTimeout(() => {
          this.autoNextSentence(i);
        }, this.textSpeed);
      } else {
        //滚动播完了，可以获取新文本了
        this.flag = 1
        //避免刷新成旧的immtext文本
        this.storyText.immText = this.storyBackEndText;
        //滚动播完了，下次要滚动开始
        this.dialogClickCount = 0
        if (!this.stopAuto) {
          this.sleep(1000);
          this.nextInstruct();
        }
      }
    }
    ,
    /**
     * nextSetence的自己实现版本，深入理解匿名函数中为什么无法用this，函数的立即执行,以及settimeout的调度队列原理
     */
// nextSetence(i) {
//   let _this = this
//   for (i; i <= this.backEndText.length; i++) {
//     (function (i) {
//         setTimeout(() => {
//           _this.showText = _this.backEndText.slice(0, i);
//         }, i * 50)
//       }
//     )(i)
//   }
// }

    resetMask() {
      this.storyMask.animationName = null
      this.storyMask.animationDuration = null
      this.storyMask.animationDelay = null
      this.storyMask.maskUrl = null
    }
    ,

    storyOverBtn(item) {
      item.btnIndex = 1;
    }
    ,

    storyOffBtn(item) {
      item.btnIndex = 0;
    }
    ,

//可保证按按钮时音效正常播放
    storyBtnClick(item) {
      let _this = this
      this.storySeUrl = require('../assets/se/0049.ogg')
      setTimeout(() => {
        _this.storySeUrl = null
      }, 200)
      if (item.routeId != 'save' && item.routeId != 'title' && item.routeId != "auto") {
        this.$router.push({
          name: item.routeId,
        })
      } else if (item.routeId == "auto") {
        _this.stopAuto = false;
        _this.flag = 1;
        _this.nextInstruct();
      } else if (item.routeId == 'title') {
        this.$emit('playBgm');
        // this.$router.go(-1);
        this.$router.push({name: "title"})
      } else if (item.routeId == "save") {
        let self = this
        //嵌套的异步then，保证进入save界面时图片已经截取完毕,allowTaint和useCORS为了解决跨域
        html2canvas(this.$refs.story, {
          allowTaint: false,
          useCORS: true
        }).then((canvas) => {
            let dataURL = canvas.toDataURL("image/png", 0.1)
            self.storySaveImgUrl = dataURL
          }
        ).then(() => {
          this.$router.push({
            name: item.routeId,
            params: {
              saveText: this.storyText.immText,
              saveImage: this.storySaveImgUrl,
              storyBgmUrl: this.storyBgmUrl,
              storyDialogUrl: this.storyDialogUrl,
              storySeUrl: this.storySeUrl,
              storyText: this.storyBackEndText,
              storyVoiceUrl: this.storyText.voiceUrl,
              storyMode: this.storyMode,
              selectMode: this.selectMode,
              storyBgUrl: this.storyBg.url,
              storyBgAnimationName: this.storyBg.animationName,
              storyBgAnimationDelay: this.storyBg.animationDelay,
              storyBgAnimationDuration: this.storyBg.animationDuration,
              storyBgShakeUp: this.storyBg.shakeUp,
              storyLihuiList: this.storyLihuiList
            }
          })
        })
      }
    }
    ,


    testCase: function () {
      this.storyBg.animationDelay = '0s,0.1s,0.2s,0.3s'
      this.storyBg.animationDuration = '0.1s,0.1s,0.1s,0.1s'
      this.storyBg.shakeUp = '1%'
      this.storyBg.animationName = 'shake-up,shake-down,shake-up,shake-down'
      this.storyLihuiList[0].animationName = 'right-move,left-move'
      this.storyLihuiList[0].animationDelay = '0s,0.5s'
      this.storyLihuiList[0].animationDuration = '0.5s,0.5s'
      this.storyLihuiList[0].rightMove = '20%'
      this.storyLihuiList[0].leftMove = '0'
      // this.storyText.voiceUrl = require('../assets/voice/fum_omake_00036.ogg')

      let temp = this.index
      this.storyMask.maskUrl = this.testCaseMask[temp]
      this.storyMask.animationDelay = '0s,1.5s'
      this.storyMask.animationDuration = '1.5s,1s'
      this.storyMask.animationName = 'img-switch-light,img-switch-dark'
      this.index++
      setTimeout(() => {
        this.resetMask()
      }, 3000)
    }
  }

}
</script>

<style>
.story {
  position: absolute;

  height: 100%;
  width: 100%;
}

#story-floor {
  position: absolute;
  margin: -1%;
  padding: -1%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#story-bg {
  position: absolute;
  /*不能设置宽高都为100%，目的在于背景震动时不能露底*/
  /*width: 100%;*/
  /*height: 100%;*/
  margin: -1%;
  padding: -1%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#story-mask {
  position: absolute;

  margin: -1%;
  padding: -1%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.story-button-area {
  position: absolute;

  width: 100%;
  height: 10%;
  left: 32%;
  bottom: 0%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /*border-style: solid;*/
  /*border-color: red;*/
}

.story-button-area
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

.select-button-area {
  position: absolute;

  width: 100%;
  height: 80%;
  left: 8%;
  bottom: 25%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /*border-style: solid;*/
  /*border-color: red;*/
}

.select-button-area
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

.select-text {
  position: absolute;

  top: -20%;
  left: 10%;
  right: 10%;

  font-size: 25px;
  color: aliceblue;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.story-lihui-area {
  position: absolute;

  width: 100%;
  height: 80%;
  bottom: 0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /*border-style: solid;*/
  /*border-color: black;*/
}


.story-lihui-area
img {
  position: absolute;
  left: -235%;
  top: -40%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.story-dialog-area {
  position: absolute;

  bottom: 0;
  left: 2.5%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.story-dialog-area
.story-text {
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

@keyframes shake-down {
  from {
    bottom: var(--shake-up);
  }
  to {
    /*与图片拉伸比有关*/
    bottom: -5%;
  }
}

@keyframes shake-up {
  from {
    bottom: -5%
  }
  to {
    bottom: var(--shake-up);
  }
}

@keyframes jump-up {
  from {
    bottom: 0;
  }
  to {
    /*使用css变量*/
    bottom: var(--jump-up);
  }
}

@keyframes jump-down {
  from {
    bottom: var(--jump-up);
  }
  to {
    bottom: 0;
  }
}

@keyframes right-move {
  from {
    left: var(--left-move);
  }
  to {
    left: var(--right-move);
  }
}

@keyframes left-move {
  from {
    left: var(--right-move);
  }
  to {
    left: var(--left-move);
  }
}

@keyframes img-switch-light {
  0% {
    opacity: 0
  }
  100% {
    opacity: 100%;
  }
}

@keyframes img-switch-dark {
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0
  }
}

</style>
