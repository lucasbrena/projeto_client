<template>
    <v-container>
        <Tabs></Tabs>

        <!-- Cart Screen -->
        <v-row justify="center">
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="phone-mockup mx-auto" elevation="8">
                    <div class="screen">
                        <div class="status-bar">
                            <span>9:41</span>
                            <span class="signal">●●●●○</span>
                        </div>
                        <v-card-text class="cart-screen">
                            <div class="cart-header">
                                <v-btn icon class="back-btn">
                                    <v-icon>mdi-arrow-left</v-icon>
                                </v-btn>
                                <h2 class="menu-title">SEU PEDIDO</h2>
                            </div>
                            <div class="cart-items">
                                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                                    <div class="cart-item-info">
                                        <h4>{{ item.name }}</h4>
                                        <div class="quantity-control">
                                            <v-btn icon x-small class="qty-btn" @click="decreaseQuantity(item.id)">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <span class="quantity">{{ item.quantity }}</span>
                                            <v-btn icon x-small class="qty-btn" @click="increaseQuantity(item.id)">
                                                <v-icon>fas fa-plus</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div class="item-price">{{ formatPrice(item.price * item.quantity) }}</div>
                                </div>
                            </div>
                            <div class="cart-total">
                                <div class="total-row">
                                    <span>Subtotal</span>
                                    <span>{{ formatPrice(subtotal) }}</span>
                                </div>
                                <div class="total-row">
                                    <span>Taxa de serviço (10%)</span>
                                    <span>{{ formatPrice(serviceCharge) }}</span>
                                </div>
                                <div class="total-row final">
                                    <span>Total</span>
                                    <span>{{ formatPrice(total) }}</span>
                                </div>
                            </div>
                            <v-btn large class="primary-btn rounded">
                                Realizar Pagamento
                            </v-btn>
                        </v-card-text>
                    </div>
                </v-card>
                <div class="screen-label mt-n10">6. Tela do Carrinho</div>
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
        cartItems: [
            {
                id: 1,
                name: 'Filé à Parmegiana',
                price: 45.90,
                quantity: 2
            },
            {
                id: 2,
                name: 'Salmão Grelhado',
                price: 52.90,
                quantity: 1
            }
        ],
    }),
    created() { },
    computed: {
        subtotal() {
            return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        serviceCharge() {
            return this.subtotal * 0.1
        },
        total() {
            return this.subtotal + this.serviceCharge
        }
    },
    methods: {
        formatPrice(value) {
            return `R$ ${value.toFixed(2).replace('.', ',')}`
        },
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
