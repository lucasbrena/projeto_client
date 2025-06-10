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
                <v-btn @click="deleteCliente()" class="primary-btn mb-2">
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
  created() {
    this.getCliente();
  },
  computed: {},
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
    //
    async getCliente() {
      let clienteId = 14;
      const response = await this.apiRequest(
        "get",
        `http://localhost:3000/cliente/${clienteId}`
      );
      console.log("Cliente:", response);
    },
    async getAllClientes() {
      let teste = await this.apiRequest("get", "http://localhost:3000/cliente");
      console.log("teste", teste);
    },
    async postCliente() {
      try {
        const clientData = {
          cpf: "123456789012",
          nome: "Jose Mendes",
          email: "jose@email.com",
        };

        const response = await this.apiRequest(
          "post",
          "http://localhost:3000/cliente",
          clientData
        );

        console.log("Cliente criado com sucesso:", response);
        return response;
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return null;
      }
    },
    async updateCliente() {
      try {
        let clienteId = 15; // Substitua pelo ID do cliente que deseja atualizar
        const updatedData = {
          nome: "Maria Silva",
          email: "maria@email.com",
        };
        const response = await this.apiRequest(
          "patch",
          `http://localhost:3000/cliente/${clienteId}`,
          updatedData
        );
        console.log("Cliente atualizado com sucesso:", response);
        return response;
      } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        return null;
      }
    },
    // nao possui delete cliente no backend
    // async deleteCliente() {
    //   try {
    //     let clienteId = 15; // Substitua pelo ID do cliente que deseja deletar
    //     const response = await this.apiRequest(
    //       "delete",
    //       `http://localhost:3000/cliente/${clienteId}`
    //     );
    //     console.log("Cliente deletado com sucesso:", response);
    //     return response;
    //   } catch (error) {
    //     console.error("Erro ao deletar cliente:", error);
    //     return null;
    //   }
    // },
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
