<template>
  <div class="story" @mousewheel.prevent>
    <audio :src="storyBgmUrl" autoplay="autoplay" loop="loop"></audio>
    <audio :src="storyText.voiceUrl" autoplay="autoplay"></audio>
    <audio :src="storySeUrl" autoplay="autoplay"></audio>
    <img :src="storyFloorUrl" id="story-floor">
    <img :src="storyBg.url" id='story-bg' :style="{
    animationName: storyBg.animationName,
    animationDuration: storyBg.animationDuration,
    animationDelay: storyBg.animationDelay,
    //css变量在vue中使用这种方式与data绑定
    '--shake-up':storyBg.shakeUp,
    }" ondragstart="return false;">
    <img :src="storyMask.maskUrl" id="story-mask" :style="{
         animationName: storyMask.animationName,
         animationDuration: storyMask.animationDuration,
         animationDelay: storyMask.animationDelay,
         animationFillMode: 'forwards'
         }"
         ondragstart="return false;">
    }
    <!--   这里可以插入想要自己定义的特效-->
    <ul class="story-lihui-area">
      <li v-for="(item,index) in storyLihuiList" :class="item.class" :style="{
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
        <img :src="item.lihuiSrc" ondragstart="return false;">
      </li>
    </ul>
    <!--    test case-->
    <div class="story-dialog-area" @click="nextSentence(0),testCase()">
      <img :src=storyDialogUrl ondragstart="return false;">
      <p v-if="dialogClickCount%2==1" class="story-text">
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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Story",

  data() {
    return {
      storyBg: {
        url: require('../assets/bg/0229.png'),
        animationName: '',
        animationDuration: '',
        animationDelay: '',
        shakeUp: '',
      },

      storyBgmUrl: require('../assets/bgm/bgm01.ogg'),

      storyDialogUrl: require('../assets/main2/tip_meswindow_back.png'),

      storySeUrl: require('../assets/se/0001.ogg'),

      storyMask: {maskUrl: '', animationName: '', animationDelay: '', animationDuration: ''},

      storyFloorUrl: require('../assets/main2/black.png'),

      storyText: {rollText: '', immText: '', voiceUrl: require('../assets/voice/fum_omake_00035.ogg'), showMode: 0},

      storyLogText: '',

      storyLogLength: 20,

      storyBackEndText: '无想神气合一！无想神气合一！无想神气合一！无想神气合一！无想神气合一！无想神气合一！',

      textSpeed: 30,

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
          routeId: 'return',
          btnIndex: 0
        }
      ],

      storyLihuiList: [
        {
          lihuiSrc: require('../assets/lihui/0132.png'),
          animationName: '',
          animationDuration: '',
          animationDelay: '',
          jumpUp: '',
          rightMove: '',
          leftMove: ''
        },
        {lihuiSrc: ''},
        {
          lihuiSrc: require('../assets/lihui/0320.png'),
          animationName: 'jump-up,jump-down',
          animationDuration: '0.3s,0.3s',
          animationDelay: '0s,0.3s',
          jumpUp: '10%',
          rightMove: '20%',
          leftMove: ''
        },
        {lihuiSrc: '', class: "normal"},
        {
          lihuiSrc: require('../assets/lihui/0445.png'),
          animationName: '',
          animationDuration: '',
          animationDelay: '',
          jumpUp: '',
          rightMove: '',
          leftMove: ''
        }
      ],


      index: 0,
      testCaseMake: [require('../assets/bg/0072.png'), require('../assets/bg/0073.png')]
    }
  },

  mounted() {
    this.storyText.immText = this.storyBackEndText;
    this.storyLogText = new Array(this.storyLogLength)
    for (let i = 0; i < this.storyLogLength; i++) {
      this.storyLogText[i] = '';
    }
  },

  methods: {
    /**
     * 获取下一句游戏文本
     * @param i 用于文本展示特效，无需修改
     */

    nextSentence() {
      this.dialogClickCount += 1
      this.storyText.immText = this.storyBackEndText;
      //类似懒加载
      if (this.dialogClickCount % 2 == 1) {
        this.rollNextSentence(0)
      }
    },

    rollNextSentence(i) {
      if (this.dialogClickCount % 2 != 1) {
        i = 0
      }
      if (i <= this.storyBackEndText.length) {

        this.storyText.rollText = this.storyBackEndText.slice(0, i++);
        setTimeout(() => {
          this.rollNextSentence(i);
        }, this.textSpeed);

      }
    },
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
      this.storyMask.animationName = ''
      this.storyMask.animationDuration = ''
      this.storyMask.animationDelay = ''
      this.storyMask.maskUrl = ''
    },

    storyOverBtn(item) {
      item.btnIndex = 1;
    },

    storyOffBtn(item) {
      item.btnIndex = 0;
    },

    //可保证按按钮时音效正常播放
    storyBtnClick(item) {
      let _this = this
      this.storySeUrl = require('../assets/se/0049.ogg')
      setTimeout(() => {
        _this.storySeUrl = ''
      }, 200)
      console.log(this.logText)
      console.log(this.logLength)
      this.$router.push({
        name: item.routeId,
        params: {
          logText: this.storyLogText,
          logLength: this.storyLogLength
        }
      })
    },


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
      this.storyText.voiceUrl = require('../assets/voice/fum_omake_00036.ogg')

      let temp = this.index
      this.storyMask.maskUrl = this.testCaseMake[temp]
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
  left: 40%;
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
