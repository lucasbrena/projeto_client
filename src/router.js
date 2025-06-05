// filepath: c:\Users\Lucas\Desktop\comanda\client\src\router.js
import Vue from 'vue'
import Router from 'vue-router'
import InicioPage from './views/InicioPage.vue'
import ReservaMesa from './views/ReservaMesa.vue'
import CardapioPage from './views/CardapioPage.vue'
import ConfirmacaoPedido from './views/ConfirmacaoPedido.vue'
import StatusPedido from './views/StatusPedido.vue'
import PagamentoPedido from './views/PagamentoPedido.vue'
import Saida from './views/SaidaPage.vue'

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
      path: '/confirmacao',
      name: 'Confirmacao',
     component: ConfirmacaoPedido
    },
      {
      path: '/status',
      name: 'Status',
     component: StatusPedido
    },
     {
      path: '/pagamento',
      name: 'Pagamento',
     component: PagamentoPedido
    },
      {
      path: '/saida',
      name: 'Saida',
     component: Saida
    }
    
  ]
})