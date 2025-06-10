<template>
  <v-container>
    <Tabs></Tabs>

    <v-row justify="center">
      <!-- Reserva de Mesas Screen -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="reservation-screen">
              <div class="reservation-content">
                <h2 class="menu-title">Reserva de Mesa</h2>
                <p class="menu-subtitle">
                  Escolha a data, horário e número de pessoas
                </p>
                <v-form class="reservation-form">
                  <v-text-field
                    v-model="reservationData.date"
                    type="date"
                    outlined
                    dense
                    hide-details
                    class="mb-3"
                    style="border-radius: 10px"
                  />
                  <v-text-field
                    v-model="reservationData.time"
                    type="time"
                    outlined
                    dense
                    hide-details
                    class="mb-3"
                    style="border-radius: 10px"
                  />
                  <v-select
                    v-model="reservationData.people"
                    :items="peopleOptions"
                    outlined
                    dense
                    hide-details
                    class="mb-4"
                    style="border-radius: 10px"
                  />
                  <v-btn large class="primary-btn" @click="reservarMesa()">
                    Reservar Mesa
                  </v-btn>
                </v-form>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">2. Reserva de Mesa</div>
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
    reservationData: {
      date: "",
      time: "",
      people: "2 pessoas",
    },
    peopleOptions: [
      "1 pessoa",
      "2 pessoas",
      "3 pessoas",
      "4 pessoas",
      "5 pessoas",
      "6 pessoas",
    ],
    cliente: {},
  }),
  created() {
    this.getCliente();    
  },
  methods: {
    formatPrice(value) {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    },
    increaseQuantity(itemId) {
      const item = this.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(itemId) {
      const item = this.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
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
      console.log("Cliente:porra", this.cliente);
    },

    async reservarMesa() {
      const payload = {
        date: this.reservationData.date,
        time: this.reservationData.time,
        people: this.reservationData.people,
      };
      console.log("Dados da reserva:", payload);

      // try {
      //   const response = await this.apiRequest(
      //     "post",
      //     "http://localhost:3000/reserva-mesa",
      //     payload
      //   );
      //   console.log("Reserva de mesa criada com sucesso:", response);
      //   alert("Reserva realizada com sucesso!");
      //   return response;
      //   // Aqui você pode redirecionar ou atualizar a tela conforme necessário
      // } catch (error) {
      //   // O tratamento de erro já está no apiRequest
      //   console.error("Erro ao criar reserva:", error);
      //   return null;
      // }
    },
  },
};
</script>

<style scoped>
/* Component-specific styles only (if any) */
.phone-mockup {
  width: 360px;
  height: 600px;
  border-radius: 30px;
  overflow: hidden;
  border: 7px solid #000;
}
</style>
