<template>
    <v-container>
        <Tabs></Tabs>
        <!-- Menu Screen -->
        <v-row justify="center">
            <!-- Reserva de Mesas Screen -->
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="phone-mockup mx-auto" elevation="8">
                    <div class="screen">
                        <div class="status-bar">
                            <span>9:41</span>
                            <span class="signal">●●●●○</span>
                        </div>

                        <v-card-text class="menu-screen d-flex">
                            <v-col>
                                <v-row class="justify-center align-center flex-column">
                                    <div class="menu-header d-flex justify-center align-center flex-column">
                                        <span class="menu-title font-weight-bold">CARDÁPIO DIGITAL</span>
                                        <span class="menu-subtitle font-weight-thin text-capitalize">Mesa 17 - {{
                                            estabelecimento.nome }}</span>
                                    </div>

                                    <div class="my-4"></div>

                                    <v-chip-group v-model="selectedCategory" class="menu-categories" mandatory>
                                        <v-chip v-for="category in categories" :key="category" :value="category"
                                            class="category-chip">
                                            {{ category }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-row>

                                <v-row class=" justify-center flex-column">
                                    <div class="menu-items pa-2">
                                        <div v-for="item in menuItems" :key="item.id"
                                            class="menu-item d-flex align-center justify-between ">
                                            <v-col>
                                                <v-row>
                                                    <v-col cols="3">
                                                        <div class="item-info d-flex flex-column align-start">
                                                            <v-img src="https://placehold.co/500x500/B6B6B6/FFF"
                                                                cover></v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col cols="6" class="d-flex flex-column align-items-center justify-space-between">
                                                        <div
                                                            class="item-info d-flex flex-column align-start justify-center">
                                                            <span class="text-body-2 font-weight-bold">{{ item.nome
                                                            }}</span>
                                                            <span class="text-subtitle-2 font-weight-thin">{{
                                                                item.descricao }}</span>
                                                        </div>
                                         
                                                        <div class="item-actions d-flex align-center">
                                                            <div class="item-price text-body-1 font-weight-bold me-5">
                                                                R$ {{
                                                                    item.valor }}</div>
                                                            <div>
                                                                <v-btn small class="primary-btn"
                                                                    @click="clicked = true; savedItem = item">
                                                                    <v-icon small>fas
                                                                        fa-utensils</v-icon>Quero</v-btn>
                                                            </div>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </div>
                                    </div>
                                </v-row>

                                <v-divider :thickness="12" class="my-6"></v-divider>

                                <v-row class="justify-center">
                                    <v-btn 
                                        large 
                                        :disabled="!clicked" 
                                        class="primary-btn mt-4 rounded"
                                        @click="savePedido(savedItem)">
                                        Finalizar Pedido
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-card-text>
                    </div>
                </v-card>
                <div class="screen-label mt-n10">3. Tela do cardápio</div>
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
        savedItem: null,
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
                
                alert("Pedido salvo com sucesso!");
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
.menu-items {
    background-color: #E0E0E0;
}
</style>