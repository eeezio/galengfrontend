<template>
  <div class="config" @mousewheel.prevent>
    <img :src="configBgUrl" id="config-bg" ondragstart="return false;">
    <vue-slider id="config-bgm-value" v-model="configBgmVolume"></vue-slider>
    <vue-slider id="config-se-value" v-model="configSeVolume"></vue-slider>
    <vue-slider id="config-voice-value" v-model="configVoiceVolume"></vue-slider>
    <vue-slider id="config-text-value" v-model="configTextSpeed"></vue-slider>
    <vue-slider id="config-auto-value" v-model="configAutoSpeed"></vue-slider>
    <div class="config-return-button" @mouseenter="configOverBtn()" @mouseleave="configOffBtn()"
         @click="configClickReturn">
      <img :src="configButton.btnSrc[configButton.btnIndex]">
    </div>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component"
import 'vue-slider-component/theme/antd.css'

export default {
  name: "config",
  components: {vueSlider},
  data: function () {
    return {
      configBgUrl: require('../assets/config/back_system.png'),
      configBgmVolume: this.$Global.bgmVolume,
      configTextSpeed: this.$Global.textSpeed,
      configSeVolume: this.$Global.seVolume,
      configAutoSpeed: this.$Global.autoSpeed,
      configVoiceVolume: this.$Global.voiceVolume,
      configButton: {
        btnSrc: [require('../assets/saveload/btn_back_off.png'), require('../assets/saveload/btn_back_on.png')],
        btnIndex: 0
      }
    }
  },

  updated() {
    this.$Global.bgmVolume = this.configBgmVolume
    this.$Global.textSpeed = this.configTextSpeed
    this.$Global.seVolume = this.configSeVolume
    this.$Global.autoSpeed = this.configAutoSpeed
    this.$Global.voiceVolume = this.configVoiceVolume
  },

  methods: {
    configOverBtn() {
      this.configButton.btnIndex = 1
    },

    configOffBtn() {
      this.configButton.btnIndex = 0
    },

    configClickReturn() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#config-bg {
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

#config-bgm-value {
  position: absolute;

  top: 38%;
  left: 15%;
  right: 64%;
}

#config-se-value {
  position: absolute;

  top: 47.2%;
  left: 15%;
  right: 64%;
}

#config-voice-value {
  position: absolute;

  top: 57.3%;
  left: 15%;
  right: 64%;
}

#config-text-value {
  position: absolute;

  top: 67.3%;
  left: 15%;
  right: 64%;
}

#config-auto-value {
  position: absolute;

  top: 76.5%;
  left: 15%;
  right: 64%;
}

.config-return-button {
  position: absolute;
  bottom: 1%;
  left: 85%;
}


</style>
