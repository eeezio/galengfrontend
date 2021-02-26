<template>
  <div class="load" @mousewheel.prevent>
    <img :src="loadBgUrl" id="load-bg" ondragstart="return false;">
    <div class="load-area">
      <div v-for="(item,index) in this.loadPage" class="load-button" @click="loadData(index)">
        <img :src="loadBtnUrl">
        <img class="load-data-image" v-if="item.image!=''" :src="item.image">
        <p class="load-text" v-if="item.haveData==1">{{ item.saveText }}</p>
      </div>
    </div>
    <ul class="load-button-area">
      <li v-for="(item,index) in loadButtonList" @mouseenter="loadOverBtn(item)" @mouseleave="loadOffBtn(item)">
        <img :src="item.btnSrc[item.btnIndex]" @click="loadBtnClick(index)"
             ondragstart="return false;">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Load",


  data() {
    return {
      loadBgUrl: require('../assets/saveload/back_load.png'),
      loadBtnUrl: require('../assets/saveload/btn_plate_back_off.png'),
      loadButtonList: [{
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
      loadPage: '',
      currentPage: 0,
    }
  },
  mounted() {
    this.loadPage = this.$Global.saveBtnContext[0].saveInfo
  },
  methods: {
    loadData(i) {
      let finalResponse = {
        runtimeSave: null,
        lihuiSave: []
      }
      let _this = this
      let getLihuiSave = new Promise(function (resolve, reject) {
        axios.get("http://localhost:8080/selectLihuiSave" + '/' + 'root' + '/' + 'galeng' + '/' + _this.currentPage + '/' + i).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })

      let getRuntimeSave = new Promise(function (resolve, reject) {
        axios.get("http://localhost:8080/selectRuntimeSave" + '/' + 'root' + '/' + 'galeng' + '/' + _this.currentPage + '/' + i).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })

      getLihuiSave.then((res) => {
          let j;
          for (j = 0; j < res.length; j++) {
            finalResponse.lihuiSave[j] = res[j]
          }
        }
      ).catch((err) => {
        console.log(err)
      })

      getRuntimeSave.then((res) => {
        finalResponse.runtimeSave = res
      }).catch((err) => {
        console.log(err)
      })

      Promise.all([getRuntimeSave, getLihuiSave]).then((result) => {
        this.$router.push({
          name: 'story',
          params: finalResponse
        })
      }).catch((err) => {
        console.log(err)
      })
    },

    loadOverBtn(item) {
      item.btnIndex = 1;
    }
    ,

    loadOffBtn(item) {
      item.btnIndex = 0;
    }
    ,

    loadBtnClick(index) {
      if (index <= 1) {
        this.currentPage = index;
        this.loadPage = this.$Global.saveBtnContext[index].saveInfo
        this.$forceUpdate()
      } else {
        this.$router.go(-1)
      }
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

.load-button-area {
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

.load-button-area
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
