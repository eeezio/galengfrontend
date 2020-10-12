import Vue from 'vue'
import VueRouter from "vue-router";

import Story from "../components/Story";
import Log from "../components/Log";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/story',
      name: 'story',
      component: Story,
      children: [{
        path: 'log',
        name:'log',
        component: Log
      }]
    },
  ]
})
