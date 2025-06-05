<template>
  <v-container>
    <Tabs></Tabs>

    <v-row justify="center">
      <!-- QR Code Saída Screen -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="qr-screen">
              <div class="menu-header">
                <h2 class="menu-title">Saída / Encerrar Comanda</h2>
              </div>
              <div class="qr-content">
                <div class="qr-viewfinder">
                  <v-img
                    src="./assets/comanda-digital-saida.png"
                    alt="QR Code Saída"
                    contain
                    height="100%"
                  />
                  <div class="qr-corner top-left"></div>
                  <div class="qr-corner top-right"></div>
                  <div class="qr-corner bottom-left"></div>
                  <div class="qr-corner bottom-right"></div>
                </div>
                <h3 class="qr-text">Escaneie o QR Code para liberar catraca</h3>
                <p class="qr-subtitle">
                  Aproxime o QR Code de saída<br />para finalizar sua comanda
                </p>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">7. Saída / Encerrar Comanda</div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    tab: "option-1",
  }),
  created() {},
  computed: {},
  methods: {
    async apiRequest(method, url, data = null) {
      try {
        const response = await axios({ method, url, data });
        return response.data;
      } catch (error) {
        console.error(
          `Erro na requisição ${method.toUpperCase()} ${url}:`,
          error
        );
        alert("Ocorreu um erro ao processar a solicitação.");
        throw error;
      }
    },
    async teste() {
      let teste = await this.apiRequest("get", "http://localhost:3000/tarefas");
      console.log("porra", teste);
    },
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
