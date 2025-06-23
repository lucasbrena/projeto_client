<template>
    <v-container>
        <Tabs></Tabs>
        <!-- QR Code Scan Screen -->
        <v-row justify="center">
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="phone-mockup mx-auto" elevation="8">
                    <div class="screen">
                        <div class="status-bar">
                            <span>9:41</span>
                            <span class="signal">●●●●○</span>
                        </div>

                        <v-card-text class="qr-screen d-flex">
                            <div class="col">
                                <div class="row">
                                    <div class="qr-content">
                                        <div class="qr-viewfinder">
                                            <v-img src="./assets/comanda-digital-saida.png" alt="QR Code" contain height="95%"
                                                style="cursor: pointer;" id="img-btn" @click="onImgClick" />
                                            <div class="qr-corner top-left"></div>
                                            <div class="qr-corner top-right"></div>
                                            <div class="qr-corner bottom-left"></div>
                                            <div class="qr-corner bottom-right"></div>
                                        </div>

                                        <span class="qr-subtitle">
                                            Escaneie o QR Code para liberar catraca
                                            <br>
                                          
                                        </span>
                                    </div>
                                </div>

                                <div class="my-16"></div>

                                <div class="row w-100 justify-center row-2">
                                    <div class="menu-header d-flex flex-column align-center text-center mt-16">
                                        <span class="menu-title font-weight-bold text-h4">COMANDA</span>
                                        <div class="my-1"></div>
                                        <span class="menu-title font-weight-bold  text-h4">DIGITAL</span>
                                        <div class="my-6"></div>
                                        <span class="font-weight-medium">Aproxime o QR Code de saída para finalizar sua comanda</span>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>

                <div class="screen-label mt-n10">1. Tela de Escaneamento QR</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
//import axios from "axios";
import Tabs from "../components/TabTelas.vue";

export default {
    components: {
        Tabs,
    },

    data: () => ({
        cliente: {},
    }),

    /*      created() {
             this.getCliente();
             this.getAllClientes();
             this.getEstabelecimento();
             this.getAllEstabelecimentos();
             this.getRamos();
         }, */

    methods: {
        onImgClick() {
            // Sua ação aqui, por exemplo:
            this.$router.push('/reserva');
            // ou qualquer outra lógica
        },
        /* async apiRequest(method, url, data = null) {
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
        // get all clientes
        async getAllClientes() {
            this.apiRequest("get", "http://localhost:3000/cliente")
                .then((response) => {
                    console.log("Todos os clientes:", response);
                })
                .catch((error) => {
                    console.error("Erro ao obter todos os clientes:", error);
                });
        },
        // get cliente by id
        async getCliente() {
            let clienteId = 1;
            this.cliente = await this.apiRequest(
                "get",
                `http://localhost:3000/cliente/${clienteId}`
            );
            console.log("Cliente by id:", this.cliente);
        },
        // get all estabelecimentos
        async getAllEstabelecimentos() {
            try {
                const response = await this.apiRequest(
                    "get",
                    "http://localhost:3000/estabelecimento"
                );
                console.log("Todos os estabelecimentos:", response);
            } catch (error) {
                console.error("Erro ao obter todos os estabelecimentos:", error);
            }
        },
        // get estabelecimento by id
        async getEstabelecimento() {
            try {
                let estabelecimentoId = 1;
                this.estabelecimento = await this.apiRequest(
                    "get",
                    `http://localhost:3000/estabelecimento/${estabelecimentoId}`
                );
                console.log("Estabelecimento by id:", this.estabelecimento);
            } catch (error) {
                console.error("Erro ao obter estabelecimento:", error);
            }
        },
*/

        // get ramos
        /* async getRamos() {
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

        //cria cliente
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
        //atualiza cliente by id
        async updateCliente() {
            try {
                let clienteId = '?' //Substitua pelo ID do cliente que deseja atualizar
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
        // delete cliente by id nao existe endpoint no backend
        async deleteCliente() {
            try {
                let clienteId = "?" //Substitua pelo ID do cliente que deseja deletar
                const response = await this.apiRequest(
                    "delete",
                    `http://localhost:3000/cliente/${clienteId}`
                );
                console.log("Cliente deletado com sucesso:", response);
                return response;
            } catch (error) {
                console.error("Erro ao deletar cliente:", error);
                return null;
            }
        },
        // create estabelecimento
        async postEstabelecimento() {
            try {
                const estabelecimentoData = {
                    nome: "Restaurante Turiassu",
                    cnpj: "12.345.678/0001-90",
                    endereco: "Rua Turiassu, 1234",
                    idRamo: 1,
                };
                let ramo = await this.apiRequest(
                    "post",
                    "http://localhost:3000/estabelecimento",
                    estabelecimentoData
                );
                console.log("Ramo criado:", ramo);
            } catch (error) {
                console.error("Erro ao criar ramo:", error);
            }
        },
        //create ramo
        async postRamo() {
            try {
                const ramoData = {
                    nome: "Restaurante Turiassu",
                };
                let ramo = await this.apiRequest(
                    "post",
                    "http://localhost:3000/ramos",
                    ramoData
                );
                console.log("Ramo criado:", ramo);
            } catch (error) {
                console.error("Erro ao criar ramo:", error);
            }
        }, */
    },
};
</script>