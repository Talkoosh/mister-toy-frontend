import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue';
import toyEdit from '../views/toy-edit.vue';
import toyDetails from '../views/toy-details.vue'
import toyChart from '../views/toy-chart.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toyApp',
      component: toyApp
    },
    {
      path: '/edit/:toyId',
      name:'toyEdit',
      component: toyEdit
    },
    {
      path: '/toy/:toyId',
      name:'toyDetails',
      component: toyDetails
    },
    {
      path:'/toy/chart',
      name:'toyChart',
      component: toyChart
    }
  ]
})

export default router
