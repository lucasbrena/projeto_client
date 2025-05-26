<template>
  <v-container>
    <v-tabs grow color="deep-purple accent-3" >
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
      <v-tab to="/dashboard">
        Dashboard        
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