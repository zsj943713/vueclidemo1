import Vue from 'vue'
import Router from 'vue-router'
import EarthMap from '@/components/earthMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EarthMap',
      component: EarthMap
    }
  ]
})
