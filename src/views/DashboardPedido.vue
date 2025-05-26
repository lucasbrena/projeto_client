<template>
  <v-container>
    <Tabs></Tabs>

    <v-row justify="center" class="pa-8">
      <v-col cols="12" md="12" lg="12" class="mb-6">
        <v-card class="pa-4">
          <v-card-title>
            <h3 class="font-weight-bold deep-purple--text accent-3">Pedidos - Comanda Digital</h3>
          </v-card-title>

          <v-simple-table class="elevation-1" style="width: 100%">
            <thead>
              <tr>
                <th style="width: 2%">Pedido</th>
                <th style="width: 2%">Mesa</th>
                <th style="width: 15%">Cliente</th>
                <th style="width: 20%">Prato</th>
                <th style="width: 20%">Pagamento</th>
                <th style="width: 10%">Status</th>
                <th style="width: 20%">Data e Hora</th>
                <th style="width: 20%">Observações</th>
                <th style="width: 2%">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pedidos" :key="item.numeroPedido">
                <td>{{ item.numeroPedido }}</td>
                <td>{{ item.numero_mesa }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.prato }}</td>
                <td>{{ item.pagamento }}</td>
                <td>
                  <v-chip v-if="item.status === 'PENDENTE'" color="error" small>
                    {{ item.status }}
                  </v-chip>
                  <v-chip
                    v-if="item.status === 'EM PREPARO'"
                    color="warning"
                    small
                  >
                    {{ item.status }}
                  </v-chip>
                  <v-chip
                    v-if="item.status === 'ENTREGUE'"
                    color="success"
                    small
                  >
                    {{ item.status }}
                  </v-chip>
                </td>
                <td>{{ item.dataHora }}</td>
                <td>{{ item.observacoes }}</td>
                <td>                 
                  <v-btn
                  small
                  class="ma-1"
                  color="primary"
                  icon
                  @click="editar(item)"
                >
                  <v-icon dark right>fa fa-bars</v-icon>
                </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
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

    pedidos: [
      {
        numeroPedido: 1,
        numero_mesa: 1,
        cliente: "João Silva",
        prato: "Filé à Parmegiana",
        status: "EM PREPARO",
        pagamento: "Cartão de Crédito",
        dataHora: "2025-05-13 12:45",
        observacoes: "Sem queijo",
      },
      {
        numeroPedido: 2,
        numero_mesa: 2,
        cliente: "Ana Souza",
        prato: "Risoto de Cogumelos",
        pagamento: "Dinheiro",
        status: "ENTREGUE",
        dataHora: "2025-05-13 12:40",
        observacoes: "Sem sal",
      },
      {
        numeroPedido: 3,
        numero_mesa: 3,
        cliente: "Carlos Lima",
        prato: "Pizza Calabresa",
        pagamento: "Cartão de Débito",
        status: "PENDENTE",
        dataHora: "2025-05-13 12:50",
        observacoes: "Borda recheada",
      },
    ],
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
    editar(item) {
      console.log("Editar pedido:", item);
    },
  },
};
</script>
<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #ede7f6 0%, #fff 100%);
}

.rounded-xl {
  border-radius: 24px !important;
}
.centered-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-card {
  /* Optional: if you want to control the card's width */
  width: 100%;
  max-width: 600px; /* adjust as needed */
  margin: 0 auto;
}
</style>
