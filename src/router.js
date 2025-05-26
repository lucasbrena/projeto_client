// filepath: c:\Users\Lucas\Desktop\comanda\client\src\router.js
import Vue from 'vue'
import Router from 'vue-router'
import InicioPage from './views/InicioPage.vue'
import ReservaMesa from './views/ReservaMesa.vue'
import CardapioPage from './views/CardapioPage.vue'
import Dashboard from './views/DashboardPedido.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: InicioPage
    },
    {
      path: '/reserva',
      name: 'Reserva',
      component: ReservaMesa
    }, 
    {
      path: '/cardapio',
      name: 'Cardapio',
      component: CardapioPage
    },  
    {
      path: '/dashboard',
      name: 'Dashboard',
     component: Dashboard
    }
    
  ]
})