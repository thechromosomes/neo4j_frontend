<template>
  <v-app>
    <v-container>
      <Nuxt />
      <v-overlay :value="$store.state.pageLoader">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
