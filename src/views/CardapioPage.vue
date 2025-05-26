<template>
  <v-container>
    <Tabs></Tabs>
    <v-row justify="center">
      <v-col v-for="prato in pratos" :key="prato.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto my-4" max-width="450" outlined>
          <v-img
            :src="prato.imagem"
            height="180px"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="headline">{{ prato.nome }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pt-2 pb-0 font-weight-bold text-primary">
            <h2>R$ {{ prato.preco.toFixed(2) }}</h2><br>
          </v-card-subtitle>
          <v-card-text class="text--secondary">
            {{ prato.descricao }}
          </v-card-text>

          <v-card-actions class="d-flex justify-center pb-4">
            <v-btn color="warning" elevation="2" rounded class="px-6">
              <v-icon dark right>fas fa-cart-plus</v-icon>
              Adicionar ao Pedido
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    tab: "option-1",
    pratos: [
      {
        id: 1,
        nome: "Filé à Parmegiana",
        descricao:
          "Filé empanado com molho de tomate e queijo, acompanhado de arroz e batata frita.",
        preco: 49.9,
        imagem: "/assets/parmagiana.jpg",
      },
      {
        id: 2,
        nome: "Risoto de Camarão",
        descricao: "Risoto cremoso com camarões frescos e temperos especiais.",
        preco: 59.9,
        imagem: "/assets/risotto.jpg",
      },
      {
        id: 3,
        nome: "Salada Caesar",
        descricao:
          "Alface, frango grelhado, croutons, parmesão e molho caesar.",
        preco: 29.9,
        imagem: "/assets/ceasarsalad.jpg",
      },
    ],
  }),
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
