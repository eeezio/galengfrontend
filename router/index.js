import Vue from 'vue'
import VueRouter from "vue-router";

import Story from "../components/Story";
import Log from "../components/Log";
import Save from "../components/Save";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/story',
      name: 'story',
      component: Story,
      children: [{
        path: 'log',
        name: 'log',
        component: Log
      }, {
        path: 'save',
        name: 'save',
        component: Save
      }]
    },
  ]
})
