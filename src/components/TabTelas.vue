<template>
  <v-container>
    <v-tabs class="mt-n12" grow >
      <v-tabs-slider></v-tabs-slider>

      <v-tab to="/">
        QRcode
        <!-- <v-icon small>fa-home</v-icon> -->
      </v-tab>
      <v-tab to="/reserva">
        Reserva
        <!-- <v-icon small>fa-list-ol</v-icon> -->
      </v-tab>      
      <v-tab to="/cardapio">
        Cardapio        
      </v-tab>
      <v-tab to="/confirmacao">
        Confirmação      
      </v-tab>
         <v-tab to="/status">
        Status      
      </v-tab>
      <v-tab to="/pagamento">
        Pagamento
      </v-tab>
       <v-tab to="/saida">
        Saída
      </v-tab>

    </v-tabs>
  </v-container>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style scoped></style>