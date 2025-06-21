<template>
  <v-container>
    <Tabs></Tabs>
    <!-- Menu Screen -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="menu-screen mt-n2">
              <div class="menu-header">
                <h2 class="menu-title">Cardápio Digital</h2>
                <p class="menu-subtitle">Mesa 12 • Restaurante Bella Vista</p>
              </div>
              <v-chip-group
                v-model="selectedCategory"
                class="menu-categories mb-4 mt-n6"
                mandatory
              >
                <v-chip
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                  class="category-chip"
                >
                  {{ category }}
                </v-chip>
              </v-chip-group>
              <div class="menu-items">
                <div v-for="item in menuItems" :key="item.id" class="menu-item">
                  <v-row no-gutters>
                    <v-col cols="12" m="8" md="8" lg="7">
                      <div class="item-info">
                        <h4>{{ item.nome }}</h4>
                        <p>{{ item.descricao }}</p>
                      </div>
                    </v-col>
                    <v-col cols="12" m="3" md="3" lg="4">
                      <div class="item-price">R$ {{ item.valor }}</div>
                      <div>
                        <v-btn
                          small
                          class="primary-btn"
                          @click="clicked = true"
                        >
                          <v-icon small>fas fa-utensils</v-icon> quero</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col>
                    <v-btn 
                    :disabled="!clicked"
                    class="primary-btn mt-4"
                    @click="savePedido(item)"
                    >Finalizar Pedido</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" class="text-center">
                   
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">3. Tela do Cardápio</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Tabs from "../components/TabTelas.vue";
import router from "@/router";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    tab: "option-1",
    selectedCategory: "Todos",
    categories: ["Pratos", "Bebidas", "Sobremesas"],
    menuItems: [],
    cliente: {},
    estabelecimento: {},
    disableBtn: false,
    clicked: false,
    dataAtual: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  }),
  created() {
    this.getCliente();
    this.getEstabelecimento();
    this.getProdutos();
    this.getPedido();
    this.getPedidoItem();

    // this.getRamos();
  },
  methods: {
    formatPrice(valor) {
      return `${valor.toFixed(2).replace(".", ",")}`;
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
      console.log("Cliente:", this.cliente);
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
    async getProdutos() {
      try {
        let produtos = await this.apiRequest(
          "get",
          "http://localhost:3000/produto"
        );
        console.log("Produtos:", produtos);
        this.menuItems = produtos;
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    },
    async getPedido() {
      try {
        let pedidos = await this.apiRequest(
          "get",
          "http://localhost:3000/pedido"
        );
        console.log("Pedidos:", pedidos);
      } catch (error) {
        console.error("Erro ao obter pedidos:", error);
      }
    },
    async getPedidoItem() {
      try {
        let pedidoItems = await this.apiRequest(
          "get",
          "http://localhost:3000/pedido-item"
        );
        console.log("Itens do Pedido:", pedidoItems);
      } catch (error) {
        console.error("Erro ao obter itens do pedido:", error);
      }
    },
    async savePedido(item) {
      try {
        console.log(item);
        
        let obj = {
              dtCriacao: 1,
              idCliente: 1,
              idEstabelecimento: 1,
              idStatusPedido: 1,

              itens: [
                  {
                    idProduto: 1,
                    quantidade: 3
                  }
              ]
          };
        console.log("Objeto do pedido:", obj);
        
        
           let response = await this.apiRequest(
             "post",
             "http://localhost:3000/pedido/com-itens",
             obj
           );
         console.log("itens do Pedido salvo:", response);
        router.replace({
          path: "/status",
        });
      } catch (error) {
        console.error("Erro ao salvar pedido:", error);
      }      
    },

    //  async postEstabelecimento() {
    //     try {
    //       const estabelecimentoData = {
    //         nome: "Restaurante Turiassu",
    //         cnpj: "12.345.678/0001-90",
    //         endereco: "Rua Turiassu, 1234",
    //         idRamo: 1,
    //       };
    //       let ramo = await this.apiRequest(
    //         "post",
    //         "http://localhost:3000/estabelecimento",
    //         estabelecimentoData
    //       );
    //       console.log("Ramo criado:", ramo);
    //     } catch (error) {
    //       console.error("Erro ao criar ramo:", error);
    //     }
    //   },

    // async postProduto() {
    //   try {
    //     const produtoData = {
    //       nome: "Risoto de Camarão",
    //       descricao: "Arroz arbóreo cremoso com camarões frescos e ervas",
    //       valor: 35.5,
    //       idEstabelecimento: 1, // Supondo que o ramo já esteja criado
    //     };
    //     let produto = await this.apiRequest(
    //       "post",
    //       "http://localhost:3000/produto",
    //       produtoData
    //     );
    //     console.log("Produto criado:", produto);
    //   } catch (error) {
    //     console.error("Erro ao criar produto:", error);
    //   }
    // },

    // async getRamos() {
    //   try {
    //     let ramo = await this.apiRequest(
    //       "get",
    //       "http://localhost:3000/ramos"
    //     );
    //     console.log("Ramos:", ramo);
    //   } catch (error) {
    //     console.error("Erro ao obter ramos:", error);
    //   }
    // },

    // async postRamo() {
    //   try {
    //      const ramoData = {
    //       nome: "Restaurante Turiassu",
    //     };
    //     let ramo = await this.apiRequest(
    //       "post",
    //       "http://localhost:3000/ramos",
    //       ramoData
    //     );
    //     console.log("Ramo criado:", ramo);
    //   } catch (error) {
    //     console.error("Erro ao criar ramo:", error);
    //   }
    // },
  },
};
</script>

<style scoped>
.phone-mockup {
  width: 380px;
  height: 600px;
  border-radius: 30px;
  overflow: hidden;
  border: 7px solid #000;
}
</style>
