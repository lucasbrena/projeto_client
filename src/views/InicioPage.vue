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
                <h3 class="menu-title">Comanda Digital</h3>
                <h2>Olá {{ cliente.nome }}</h2>
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
import axios from "axios";
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    cliente: {},
  }),
  created() {
    this.getCliente();
  },
  methods: {
    async apiRequest(method, url, data = null) {
      try {
        const config = {
          method,
          url,
          data,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios(config);
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
    async getCliente() {
      let clienteId = 14;
      this.cliente = await this.apiRequest(
        "get",
        `http://localhost:3000/cliente/${clienteId}`
      );
      console.log("Cliente:", this.cliente);
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
