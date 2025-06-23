<template>
    <v-container>
        <Tabs></Tabs>

        <!-- Status do Pedido Screen -->
        <v-row justify="center">
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="phone-mockup mx-auto" elevation="8">
                    <div class="screen">
                        <div class="status-bar">
                            <span>9:41</span>
                            <span class="signal">●●●●○</span>
                        </div>

                        <v-card-text class="status-screen d-flex">
                            <v-col v-if="itens">
                                <v-row class="justify-center align-center flex-column">
                                    <div>
                                        <span class="menu-title font-weight-bold">STATUS DO PEDIDO</span>
                                        <div class="my-8"></div>
                                        <div class="order-number text-h3"># {{ itens.id }}</div>
                                    </div>
                                    <div class="my-8"></div>
                                    <div class="status-steps d-flex flex-column justify-center align-center">
                                        <div>
                                            <div v-for="(step, index) in orderSteps" :key="index" class="status-step"
                                                :class="{ active: index === (status - 1) }">
                                                <span class="step-icon">{{ step.icon }}</span>
                                                <span class="step-text">{{ step.text }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <span class="confirmation-text mt-4">
                                        Seu pedido está sendo preparado.<br>
                                        Tempo estimado: 25-30 minutos
                                    </span>
                                </v-row>

                                <v-row class="w-100 justify-center align-center flex-column mt-8">
                                    <div>
                                        <v-btn block large class="primary-btn rounded" @click="alterarStatus(itens.id)">
                                            Atualizar Status
                                        </v-btn>

                                        <div class="my-4"></div>

                                        <v-btn block large class="primary-btn rounded" @click="removePedido(itens.id)">
                                            Remover pedido
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col v-else class="text-center">
                                <div>
                                    <span class="menu-title font-weight-bold">STATUS DO PEDIDO</span>
                                    <div class="my-8"></div>
                                </div>
                                <div class="mt-16"></div>
                                <span class="no-order-text">
                                    Nenhum pedido encontrado.<br>
                                    Por favor, faça um pedido primeiro.
                                </span>
                            </v-col>
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
import router from "@/router";

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
        ],
        cliente: {},
        estabelecimento: {},
        produto: {},
        dataAtual: new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        itens: 0,
        pedidoid: null,
        status: 0
    }),
    created() {
        this.getCliente();
        this.getEstabelecimento();
        this.getProdutos();
        this.getProduto();
        this.getPedido();
        this.getPedidosItens();
        this.getStatusPedido()
  


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
         async getStatusPedido() {
          try {
            let response2 = await this.apiRequest(
                    "get",
                    `http://localhost:3000/pedido/36/com-itens`,
                );

                this.status = response2.statusPedido.id;
          } catch (error) {
            console.error("Erro o status", error);
            }
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

                if(pedidos.length === 0) {
                    console.log("Nenhum pedido encontrado.");
                    return;
                }

                this.getAllPedidoItens(pedidos.sort((a, b) => b.id - a.id)[0].id);

                this.itens = null;
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

                return pedidoItems;
            } catch (error) {
                console.error("Erro ao obter itens do pedido:", error);
            }
        },
        async getAllPedidoItens(pedidoId) {
            try {
                if(pedidoId === null) {
                    return;
                }
              
                let pedidoComItens = await this.apiRequest(
                    "get",
                   `http://localhost:3000/pedido/${pedidoId}/com-itens`
                );
              
                this.itens = pedidoComItens;
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
        async removePedido(pedidoId) {
            try {

                let response = await this.apiRequest(
                    "delete",
                    `http://localhost:3000/pedido/${pedidoId}`,
                    {} // Substitua pelo ID do pedido que deseja remover
                );
                alert("Pedido removido com sucesso");
                console.log("Removido com sucesso", response ?? "Sem conteúdo na resposta");
                router.replace({
                    path: "/cardapio",
                });
                return response;
            } catch (error) {
                console.error("Erro ao remover", error);
            }
        },
        async alterarStatus(pedidoId) {
            try {
                let response = await this.apiRequest(
                    "patch",
                    `http://localhost:3000/pedido/${pedidoId}`,
                    {
                        idStatusPedido: 2
                    } // Substitua pelo ID do pedido que deseja remover
                );

                let response2 = await this.apiRequest(
                    "get",
                    `http://localhost:3000/pedido/${pedidoId}/com-itens`,
                );

                this.status = response2.statusPedido.id;
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