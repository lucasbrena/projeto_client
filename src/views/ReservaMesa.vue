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

                        <v-card-text class="reservation-screen d-flex">
                            <div class="col">
                                <div class="row justify-center align-center flex-column">
                                    <div class="reservation-items d-flex justify-center align-center flex-column">
                                        <span class="menu-title font-weight-bold">RESERVAR MESA</span>
                                        <div class="my-1"></div>
                                        <span class="font-weight-thin">Primeiro você deve reservar uma mesa</span>
                                    </div>
                                    
                                    <div class="my-4"></div>

                                    <span class="menu-subtitle">Escolha a data, horário e Nº de pessoas</span>

                                    <v-form class="reservation-form w-100">
                                        <v-text-field 
                                            v-model="selectedData" 
                                            type="date"
                                            outlined 
                                            dense 
                                            hide-detailsclass="mb-3" 
                                            class="rounded"
                                        />
                                        <v-text-field 
                                            v-model="selectedHora" 
                                            type="time" 
                                            outlined 
                                            dense
                                            hide-detailsclass="mb-3" 
                                            class="rounded mb-3"
                                        />
                                        <v-select 
                                            v-model="selectedPeople" 
                                            :items="peopleOptions" 
                                            outlined 
                                            dense 
                                            hide-detail
                                            class="rounded mb-4" 
                                            item-text="text" 
                                            item-value="value" 
                                        />
                                        <v-btn 
                                            v-if="!reserva.length > 0" 
                                            :disabled="!disableBtn" 
                                            large 
                                            class="rounded primary-btn" 
                                            @click="reservarMesa()"> 
                                            Reservar Mesa
                                        </v-btn>

                                        <v-btn v-else                      
                                            large 
                                            :disabled="!disableBtn2" 
                                            class="rounded warning-btn" 
                                            @click="editarMesa()">
                                            Alterar reserva
                                        </v-btn>
                                    </v-form>
                                </div>

                                <div class="mt-10"></div>

                                <div class="row w-100 align-center flex-column row-2-reservation">
                                    <div v-if="this.reserva != null" class="mt-5">
                                        <div v-if="Array.isArray(reserva) && reserva.length">
                                            <span class="text-center font-weight-medium">Última Reserva</span>
                                            <div class="text-justify mt-7">
                                                <div>
                                                    <strong>Data:</strong>
                                                    {{
                                                        new Date(
                                                            reserva[reserva.length - 1].dt_reserva
                                                        ).toLocaleString(
                                                            "pt-BR",
                                                            {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }
                                                        )
                                                    }}
                                                </div>
                                                <div>
                                                    <strong>Hora:</strong>
                                                    {{
                                                        new Date(
                                                            reserva[reserva.length - 1].dt_reserva
                                                        ).toLocaleString("pt-BR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                    }}
                                                </div>
                                                <div>
                                                    <strong>Nº de Pessoas:</strong>
                                                    {{ reserva[reserva.length - 1].qtd_lugares }}
                                                </div>
                                                <div>
                                                    <strong>Status:</strong>
                                                    {{ reserva[reserva.length - 1].status || "Pendente" }}
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="mt-12 font-weight-regular text-h6">Reserve sua mesa!</div>
                                    </div>
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
        resetFormFields() {
            this.selectedData = null;
            this.selectedHora = null;
            this.selectedPeople = null;
            this.disableBtn = false;
            this.disableBtn2 = false;
        },
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
            let clienteId = 2;
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
                this.resetFormFields();
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
                this.resetFormFields();
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
    .reservation-form-field {
        border-radius: .3rem;
    }

    .phone-mockup {
        overflow: hidden;
    }
</style>