<template>
  <v-container>
    <Tabs></Tabs>
    <!-- QR Code Scan Screen -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="qr-screen">
              <div class="menu-header">
                <h2 class="menu-title">Comanda Digital</h2>
              </div>
              <div class="qr-content">
                <div class="qr-viewfinder">
                  <v-img
                    src="./assets/comanda-digital.png"
                    alt="QR Code"
                    contain
                    height="95%"
                  />
                  <div class="qr-corner top-left"></div>
                  <div class="qr-corner top-right"></div>
                  <div class="qr-corner bottom-left"></div>
                  <div class="qr-corner bottom-right"></div>
                </div>
                <h3 class="qr-text">Escaneie o QR Code para começar</h3>
                <p class="qr-subtitle">
                  Posicione o código QR da <br />mesa para iniciar
                </p>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">1. Tela de Escaneamento QR</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
 
  }),
  methods: {
  
  },
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
