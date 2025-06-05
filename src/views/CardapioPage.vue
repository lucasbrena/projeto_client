<template>
  <v-container>
    <Tabs></Tabs>
     <!-- Menu Screen -->
    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="phone-mockup mx-auto" elevation="8">
          <div class="screen">
            <div class="status-bar">
              <span>9:41</span>
              <span class="signal">●●●●○</span>
            </div>
            <v-card-text class="menu-screen">
              <div class="menu-header">
                <h2 class="menu-title">Cardápio Digital</h2>
                <p class="menu-subtitle">Mesa 12 • Restaurante Bella Vista</p>
              </div>
              <v-chip-group
                v-model="selectedCategory"
                class="menu-categories mb-4 mt-n4"
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
                <div
                  v-for="item in menuItems"
                  :key="item.id"
                  class="menu-item"
                >
                  <div class="item-info">
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.description }}</p>
                  </div>
                  <div class="item-price">{{ formatPrice(item.price) }}</div>
                </div>
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
// import axios from "axios";
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
  data: () => ({
    tab: "option-1",
    selectedCategory: "Todos",
     categories: ['Pratos', 'Bebidas', 'Sobremesas'],
      menuItems: [
        {
          id: 1,
          name: 'Filé à Parmegiana',
          description: 'Filé bovino empanado com molho de tomate e queijo derretido',
          price: 45.90
        },
        {
          id: 2,
          name: 'Salmão Grelhado',
          description: 'Salmão fresco grelhado com legumes e arroz integral',
          price: 52.90
        },
        {
          id: 3,
          name: 'Risotto de Camarão',
          description: 'Arroz arbóreo cremoso com camarões frescos e ervas',
          price: 48.90
        }
      ],   
  }),
  methods: {
    formatPrice(price) {
      return `R$ ${price.toFixed(2).replace('.', ',')}`;
    },
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
.v-chip.category-chip {
  background-color: #f8f9fa !important;
  color: #6c757d !important;
}

.v-chip.category-chip.v-chip--selected {
  background-color: #000 !important;
  color: #ffffff !important;
}
</style>
