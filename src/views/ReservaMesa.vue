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
              <div>
                <h2>{{ estabelecimento.nome }}</h2>
              </div>
              <div class="reservation-content">
                <h2 class="menu-title">Reserva de Mesa</h2>
                <h2>Olá, {{ cliente.nome }}!!</h2>
                <p class="menu-subtitle">
                  Escolha a data, horário e número de pessoas
                </p>
                <v-form class="reservation-form">
                  <v-text-field
                    v-model="selectedData"
                    type="date"
                    outlined
                    dense
                    hide-details
                    class="mb-3"
                    style="border-radius: 10px"
                  />
                  <v-text-field
                    v-model="selectedHora"
                    type="time"
                    outlined
                    dense
                    hide-details
                    class="mb-3"
                    style="border-radius: 10px"
                  />
                  <v-select
                    v-model="selectedPeople"
                    :items="peopleOptions"
                    outlined
                    dense
                    hide-detail
                    class="mb-4"
                    style="border-radius: 10px"
                    item-text="text"
                    item-value="value"
                  />
                  <v-btn
                    v-if="!reserva.length > 0"
                    :disabled="!disableBtn"
                    large
                    class="primary-btn"
                    @click="reservarMesa()"
                  >
                    Reservar Mesa
                  </v-btn>
                  <v-btn v-else large 
                  :disabled="!disableBtn2"
                    class="warning-btn"
                    @click="editarMesa()">
                    Alterar reserva
                  </v-btn>
                </v-form>
              </div>
              <div v-if="this.reserva != null">
                <div class="mt-4">
                  <div v-if="Array.isArray(reserva) && reserva.length">
                    <h3>Última Reserva</h3>
                    <div>
                      <strong>Data:</strong>
                      {{
                        new Date(
                          reserva[reserva.length - 1].dt_reserva
                        ).toLocaleString()
                      }}
                    </div>
                    <div>
                      <strong>Quantidade de Pessoas:</strong>
                      {{ reserva[reserva.length - 1].qtd_lugares }}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      {{ reserva[reserva.length - 1].status || "Pendente" }}
                    </div>
                  </div>
                  <!-- <div v-else>Nenhuma reserva encontrada.</div> -->
                </div>
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
    selectedData: null,
    selectedHora: null,
    selectedPeople: null,
    peopleOptions: [
      {
        value: "1",
        text: "1 pessoa",
      },
      {
        value: "2",
        text: "2 pessoas",
      },
      {
        value: "3",
        text: "3 pessoas",
      },
      {
        value: "4",
        text: "4 pessoas",
      },
    ],
    disableBtn: false,
    disableBtn2: false,
    cliente: {},
    estabelecimento: {},
    datenow: new Date("2025-06-18T20:00:00Z"),
    reserva: [],
  }),
  watch: {
    // Observar mudanças em qualquer um dos campos
    selectedData() {
      this.validateForm();
    },
    selectedHora() {
      this.validateForm();
    },
    selectedPeople() {
      this.validateForm();
    },
  },
  created() {
    this.getCliente();
    this.getEstabelecimento();
    this.getReserva();
  },

  methods: {
    validateForm() {
      const isFormValid =
        this.selectedData && this.selectedHora && this.selectedPeople;
      this.disableBtn = isFormValid;
      this.disableBtn2 = isFormValid && this.reserva.length > 0;
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
      let clienteId = 1;
      this.cliente = await this.apiRequest(
        "get",
        `http://localhost:3000/cliente/${clienteId}`
      );
      console.log("Dados do cliente:", this.cliente);
    },
    async getEstabelecimento() {
      try {
        let estabelecimentoId = 1;
        this.estabelecimento = await this.apiRequest(
          "get",
          `http://localhost:3000/estabelecimento/${estabelecimentoId}`
        );
        console.log("Estabelecimento:", this.estabelecimento);
      } catch (error) {
        console.error("Erro ao obter estabelecimento:", error);
      }
    },
    async reservarMesa() {
      const dateString = `${this.selectedData}T${this.selectedHora}`;
      const date = new Date(dateString).toISOString();

      const payload = {
        id_cliente: this.cliente.id,
        id_estabelecimento: this.estabelecimento.id,
        dt_reserva: date,
        qtd_lugares: this.selectedPeople,
      };

      try {
        const response = await this.apiRequest(
          "post",
          "http://localhost:3000/reserva-mesa-log",
          payload
        );
        console.log("Reserva de mesa criada com sucesso:", response);
        alert("Reserva realizada com sucesso!");
        this.getReserva(); // Atualiza a lista de reservas após criar uma nova
        return response;
      } catch (error) {
        console.error("Erro ao criar reserva:", error);
        return null;
      }
    },
    async getReserva() {
      this.reserva = await this.apiRequest(
        "get",
        "http://localhost:3000/reserva-mesa-log"
      );
      console.log("reserva:", this.reserva);
    },
   
    async editarMesa() {
      const dateString = `${this.selectedData}T${this.selectedHora}`;
      const date = new Date(dateString).toISOString();

      const payload = {
        id: this.reserva[0].id, // Supondo que você queira editar a primeira reserva
        dt_reserva: date,
        qtd_lugares: this.selectedPeople,
      };

      try {
        const response = await this.apiRequest(
          "patch",
          `http://localhost:3000/reserva-mesa-log/${payload.id}`,
          payload
        );
        console.log("Reserva de mesa atualizada com sucesso:", response);
        alert("Reserva atualizada com sucesso!");
        this.getReserva(); // Atualiza a lista de reservas após editar
        return response;
      } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        return null;
      }
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
