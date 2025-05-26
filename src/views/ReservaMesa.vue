<template>
  <v-container>
    <Tabs></Tabs>

    <v-row justify="center" class="pa-8">
      <v-col
        v-for="table in tables"
        :key="table.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex align-stretch"
      >
        <v-card
          :elevation="table.occupied ? 2 : 10"
          class="mesa-card-new rounded-xl mb-4 flex-grow-1"
          :class="table.occupied ? 'mesa-ocupada' : 'mesa-disponivel'"
          max-width="320"
          min-height="180"
          style="width: 100%"
        >
          <v-card-title class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-icon
                :color="table.occupied ? 'grey' : 'deep-purple accent-4'"
                class="mr-2"
              >
                {{ table.occupied ? "mdi-close-circle" : "mdi-check-circle" }}
              </v-icon>
              <span class="font-weight-bold">Mesa {{ table.id }}</span>
            </div>
            <v-chip
              :color="
                table.occupied ? 'grey lighten-2' : 'deep-purple accent-2'
              "
              text-color="white"
              class="font-weight-bold"
            >
              <v-icon small class="mr-1">fas fa-users</v-icon>
              {{ table.seats }} lugares
            </v-chip>
          </v-card-title>
          <v-card-text class="pt-0 pb-2 text-center">
            <span
              :class="
                table.occupied
                  ? 'red--text font-weight-bold '
                  : 'green--text font-weight-bold'
              "
            >
              {{ table.occupied ? "Ocupada" : "Disponível" }}
            </span>
          </v-card-text>
          <v-card-actions class="pt-0 pb-3">
            <v-btn
              v-if="!table.occupied"
              class="mt-5"
              color="success"
              @click="reserveTable(table.id)"
              block
              rounded
              elevation="2"
            >
              Reservar
            </v-btn>
            <v-btn v-else disabled block color="error" rounded elevation="2">
              <v-icon left>mdi-lock</v-icon>
              Indisponível
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para confirmar reserva -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="font-weight-bold text-h6 d-flex align-center">
          <v-icon left color="primary" class="mr-2">mdi-calendar-edit</v-icon>
          Confirmar Reserva
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="reservationName"
            label="Nome da Reserva"
            prepend-inner-icon="mdi-account"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="reservationTime"
            label="Horário da Reserva"
            type="time"
            prepend-inner-icon="mdi-clock-outline"
            required
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            rounded
            elevation="2"
            class="ma-2"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            rounded
            elevation="2"
            class="ma-2"
            @click="confirmReservation"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      elevation="4"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
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
    tables: [
      { id: 1, seats: 4, occupied: false },
      { id: 2, seats: 2, occupied: false },
      { id: 3, seats: 6, occupied: false },
      { id: 4, seats: 4, occupied: true },
      { id: 5, seats: 8, occupied: false },
    ],
    dialog: false,
    reservationName: "",
    reservationTime: "",
    selectedTable: null,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "success",
  }),
  computed: {
    availableTables() {
      return this.tables.filter((table) => !table.occupied);
    },
    occupiedTables() {
      return this.tables.filter((table) => table.occupied);
    },
  },
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
    reserveTable(tableId) {
      this.selectedTable = tableId;
      this.dialog = true;
    },
    confirmReservation() {
      if (!this.reservationName || !this.reservationTime) {
        this.snackbarText = "Por favor, preencha todos os campos.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return;
      }
      const table = this.tables.find((t) => t.id === this.selectedTable);
      if (table) {
        table.occupied = true;
        this.snackbarText = `Mesa ${table.id} reservada com sucesso para ${this.reservationName}!`;
        this.snackbarColor = "success";
        this.snackbar = true;
        this.dialog = false;
        this.reservationName = "";
        this.reservationTime = "";
      }
    },
  },
};
</script>

<style scoped>
.mesa-ocupada {
  border: 2px solid #e57373 !important;
  background: #ffebee !important;
}
.mesa-disponivel {
  border: 2px solid #81c784 !important;
  background: #e8f5e9 !important;
}
.rounded-xl {
  border-radius: 24px !important;
}
</style>
