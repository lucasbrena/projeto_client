<template>
  <v-container>
    <Tabs></Tabs>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="8" class="mb-6 centered-card-container">
        <v-card max-width="90%" elevation="8">
          <br />
          <v-row justify="center">
            <v-col
              cols="12"
              md="12"
              lg="12"
              class="text-h4 font-weight-bold text-center"
            >
              <p>Bem-vindo a</p>
              <p>Comanda Digital</p>
              <v-img
                src="/assets/comanda.jpeg"
                alt="Comanda Digital"
                aspect-ratio="1.5"
                contain
                fill
              />
            </v-col>
          </v-row>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12">
                <h2>Escanei o QrCode para Iniciar</h2>
              </v-col>
            </v-row>
            <v-row> </v-row>
          </v-card-text>
          <v-card-actions class="justify-center mt-4">         
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tabs from "../components/TabTelas.vue";
export default {
  components: {
    Tabs,
  },
};
</script>

<style scoped></style>
