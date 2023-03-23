import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Pages/HomeView.vue'
import PortFolio from '../Pages/PortFolio.vue'
import Stocks from '../Pages/Stocks.vue'
import DashBoard from '../Pages/DashBoard.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolio',
    name: 'PortFolio',
    component: PortFolio
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks
  },
  {
    path: '/dashBoard',
    name: 'DashBoard',
    component: DashBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
