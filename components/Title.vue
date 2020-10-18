<template>
  <!--  mousewheel.prevent禁止滚轮-->
  <div class="title" @mousewheel.prevent>
    <!--    ondragstart用于禁止元素拖拽 -->
    <img :src="titleBgUrl" id="title-bg" ondragstart="return false;">
    <audio :src="titleBgmUrl" autoplay="autoplay" loop="loop" ></audio>
    <ul class="title-button-area">
      <li v-for="(item,index) in titleButtonList" @mouseenter="titleOverBtn(item)" @mouseleave="titleOffBtn(item)"
          @click="titleStopBgm(item)">

        <!--        <router-link :to=item.routeId  v-on:playBgm="storyToTitle">-->
        <img :src="item.btnSrc[item.btnIndex]" ondragstart="return false;">
        <!--        </router-link>-->
      </li>
    </ul>
    <!--    vue提供的过渡操作-->
    <!--    <transition name="component-fade" mode="out-in">-->
    <router-view></router-view>
    <!--    </transition>-->
  </div>
</template>
<script>
export default {
  name: "Title",

  data: function () {
    return {
      //vue cli中加载图片必须用require
      titleBgUrl: require('../assets/title/back.png'),
      //背景音乐url
      titleBgmUrl: require('../assets/bgm/bgm17.ogg'),
      titleButtonList: [{
        btnSrc: [require('../assets/title/btn_start01_off.png'), require('../assets/title/btn_start01_over.png')],
        routeId: "story",
        btnIndex: 0
      }, {
        btnSrc: [require('../assets/title/btn_load01_off.png'), require('../assets/title/btn_load01_over.png')],
        routeId: "/load",
        btnIndex: 0
      }, {
        btnSrc: [require('../assets/title/btn_cgmode01_off.png'), require('../assets/title/btn_cgmode01_over.png')],
        routeId: "/cg",
        btnIndex: 0
      }, {
        btnSrc: [require('../assets/title/btn_config01_off.png'), require('../assets/title/btn_config01_over.png')],
        routeId: "/setting",
        btnIndex: 0
      },
        {
          btnSrc: [require('../assets/title/btn_end01_off.png'), require('../assets/title/btn_end01_over.png')],
          routeId: "/end",
          btnIndex: 0
        }
      ]
    }
  },

  watch: {
    $route(to, from) {
      if (to.path == '/') {
        this.titleBgmUrl = require('../assets/bgm/bgm17.ogg');
      }
    }
  },
  methods: {
    /**
     * 鼠标进入按钮，切换按钮显示的图片，由indexBtn变量控制
     */
    titleOverBtn: function (item) {
      item.btnIndex = 1
    },

    /**
     * 鼠标离开按钮，切换按钮显示的图片，由indexBtn变量控制
     */
    titleOffBtn: function (item) {
      item.btnIndex = 0
    },

    /**
     * 停止标题音乐
     */
    titleStopBgm: function (item) {
      this.titleBgmUrl = ''
      this.$router.push(({
        name: item.routeId,
      }))
    },


    /**
     * method:改变标题背景图片
     * 先通过网络请求获取img的url，然后重新set
     */
    changeTitleBg: function () {
    },

  }
}

</script>

<style scoped>

/*标题背景样式*/
#title-bg {
  /*position*/
  position: absolute;

  /*box model*/
  width: 100%;
  height: 100%;
  margin: -1%;
  padding: -1%;

  /*不允许该元素被选中*/
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.title-button-area {
  /*position*/
  position: absolute;

  /*box model*/
  width: 20%;
  height: 70%;
  top: 35%;
  bottom: 15%;
  right: 3%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /*visual*/
  /*border-style: solid;*/
  /*border-color: black;*/
}

ul
li {
  position: relative;

  padding-top: 10%;

  list-style: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */
{
  opacity: 0;
}
</style>
