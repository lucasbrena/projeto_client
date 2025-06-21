<template>
  <v-container>
    <Tabs></Tabs>
     
     <!-- Status do Pedido Screen -->
    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="status-screen">
              <div class="status-content">
                <h2 class="menu-title">Status do Pedido</h2>
                <div class="order-number">#{{ itens.id }}</div>
                <div class="status-steps">
                  <div
                    v-for="(step, index) in orderSteps"
                    :key="index"
                    class="status-step"
                    :class="{ active: index === status}"
                  >
                    <span class="step-icon">{{ step.icon }}</span>
                    <span class="step-text">{{ step.text }}</span>
                  </div>
                </div>
                <p class="confirmation-text">
                  Seu pedido está sendo preparado.<br>
                  Tempo estimado: 25-30 minutos
                </p>
                <v-btn                                   
                  large
                  class="primary-btn"
                  @click="alterarStatus()"
                >
                  Atualizar Status
                </v-btn>
                <v-btn                                   
                  large
                  class="primary-btn"
                  @click="removePedido()"
                >
                  Remover pedido
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
        <div class="screen-label mt-n10">5. Status do Pedido</div>
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
     orderSteps: [
        { icon: '⏳', text: 'Preparando' },
        { icon: '🍳', text: 'Na cozinha' },
        { icon: '✅', text: 'Pronto' },
        { icon: '🛎️', text: 'Entregue' }
      ]   ,
      cliente: {},
    estabelecimento: {},
    produto: {},
      dataAtual: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), 
    itens: [],
    status: 0.
  }),
   created() {
    this.getCliente();
    this.getEstabelecimento();
    this.getProdutos();
    this.getProduto();
    this.getPedido();
    this.getPedidosItens();
    this.getAllPedidoItens();


    // this.getRamos();
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
     async getProduto() {
      try {
        let produtoId = 1; // Substitua pelo ID do produto que deseja obter
        this.produto = await this.apiRequest(
          "get",
          `http://localhost:3000/produto/${produtoId}`
        );
        console.log("Produtobyid:", this.produto);
        
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
    async getPedidosItens() {
      try {
        let pedidoItems = await this.apiRequest(
          "get",
          "http://localhost:3000/pedido-item"
        );
        console.log("Itens do Pedido:", pedidoItems, 'oi');
      } catch (error) {
        console.error("Erro ao obter itens do pedido:", error);
      }
    },
    async getAllPedidoItens() {
      try {
        let pedido = await this.apiRequest(
          "get",
          "http://localhost:3000/pedido/13/com-itens"
        );
        console.log("Itens do Pedido:", pedido);
        this.itens = pedido;
      } catch (error) {
        console.error("Erro ao obter itens do pedido:", error);
      }
    },
    async savePedido() {
      try {
        
        
        let obj = {
          dataCriacao: this.dataAtual,
          cliente: this.cliente.id,
          estabelecimento: this.estabelecimento.id,
          itemPedido: {
              quantidade: 1,
              // pedido: response.id,
              produto: this.produto.id,
            }
        };
        console.log(obj);
          let response = await this.apiRequest(
            "post",
            "http://localhost:3000/pedido",
            obj
          );
        console.log("Pedido salvo:", response);
        // if (response && response.id) {
        //   try {
        //     let itemPedido = {
        //       quantidade: 1,
        //       pedido: response.id,
        //       produto: item.id,
        //     };
        //     let itemResponse = await this.apiRequest(
        //       "post",
        //       "http://localhost:3000/pedido-item",
        //       itemPedido
        //     );
        //     console.log("Item do pedido salvo:", itemResponse);
        //   } catch (error) {
        //     console.error("Erro ao salvar item do pedido:", error);
        //   }
        // }
      } catch (error) {
        console.error("Erro ao salvar pedido:", error);
      }      
    },
    async removePedido() {
     try {
    
    let response = await this.apiRequest(
      "delete",
      `http://localhost:3000/pedido/8`,
      { } // Substitua pelo ID do pedido que deseja remover
    );
    console.log("Removido com sucesso", response ?? "Sem conteúdo na resposta");
    return response;
  } catch (error) {
    console.error("Erro ao remover", error);
  }
    },
    async alterarStatus() {
      try {
          let response = await this.apiRequest(
          "patch",
          `http://localhost:3000/pedido/13`,
          {
            idStatusPedido: 2
          } // Substitua pelo ID do pedido que deseja remover
        );

        let response2 = await this.apiRequest(
          "get",
          `http://localhost:3000/pedido/13/com-itens`,
        );
       
        this.status = response2.statusPedido.id
        return response;
      } catch (error) {
        console.error("Erro ao remover", error);
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

    async postProduto() {
      try {
        const produtoData = {
          nome: "Risoto de Camarão",
          descricao: "Arroz arbóreo cremoso com camarões frescos e ervas",
          valor: 35.5,
          idEstabelecimento: 1, // Supondo que o ramo já esteja criado
        };
        let produto = await this.apiRequest(
          "post",
          "http://localhost:3000/produto",
          produtoData
        );
        console.log("Produto criado:", produto);
      } catch (error) {
        console.error("Erro ao criar produto:", error);
      }
    },

    async getRamos() {
      try {
        let ramo = await this.apiRequest(
          "get",
          "http://localhost:3000/ramos"
        );
        console.log("Ramos:", ramo);
      } catch (error) {
        console.error("Erro ao obter ramos:", error);
      }
    },
     async getRamobyId() {
      try {
        let ramoId = 1; // Substitua pelo ID do ramo que deseja obter
        let ramo = await this.apiRequest(
          "get",
          `http://localhost:3000/ramos/${ramoId}` 
              );
        console.log("Ramos:", ramo);
      } catch (error) {
        console.error("Erro ao obter ramos:", error);
      }
    },

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
  width: 360px;
  height: 600px;
  border-radius: 30px;
  overflow: hidden;
  border: 7px solid #000;
}

</style>
