import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './css/styles.css' // Add this line
import router from './router'

Vue.use(Vuetify)

const vuetify = new Vuetify({
   icons: {
    iconfont: 'fa',
  },
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
