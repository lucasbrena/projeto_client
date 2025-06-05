<template>
  <v-container>
    <Tabs></Tabs>

    <!-- Order Confirmation Screen -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="confirmation-screen">
              <div class="confirmation-content">
                <div class="success-icon">
                  <v-icon large color="white">fas fa-check</v-icon>
                </div>
                <h2 class="confirmation-title">Pedido Confirmado!</h2>
                <div class="order-number">#1247</div>
                <p class="confirmation-text">
                  Seu pedido foi enviado para a cozinha.<br />
                  Tempo estimado: 25-30 minutos
                </p>
                <v-btn class="primary-btn mb-2">
                  Acompanhar Pedido
                </v-btn>
                <v-btn outlined class="secondary-btn">
                  Fazer Novo Pedido
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">4. Confirmação do Pedido</div>
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
