<template>
  <v-container>
    <Tabs></Tabs>
     
     <!-- Status do Pedido Screen -->
    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="status-screen">
              <div class="status-content">
                <h2 class="menu-title">Status do Pedido</h2>
                <div class="order-number">#1247</div>
                <div class="status-steps">
                  <div
                    v-for="(step, index) in orderSteps"
                    :key="index"
                    class="status-step"
                    :class="{ active: index === 0 }"
                  >
                    <span class="step-icon">{{ step.icon }}</span>
                    <span class="step-text">{{ step.text }}</span>
                  </div>
                </div>
                <p class="confirmation-text">
                  Seu pedido está sendo preparado.<br>
                  Tempo estimado: 25-30 minutos
                </p>
                <v-btn                                   
                  large
                  class="primary-btn"
                >
                  Atualizar Status
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">5. Status do Pedido</div>
      </v-col>
    </v-row>
  
  </v-container>
</template>

<script>
// import axios from "axios";
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    tab: "option-1",
     orderSteps: [
        { icon: '⏳', text: 'Preparando' },
        { icon: '🍳', text: 'Na cozinha' },
        { icon: '✅', text: 'Pronto' },
        { icon: '🛎️', text: 'Entregue' }
      ]    
  }),
};
</script>

<style scoped>
.phone-mockup {
  width: 360px;
  height: 600px;
  border-radius: 30px;
  overflow: hidden;
  border: 7px solid #000;
}

</style>
