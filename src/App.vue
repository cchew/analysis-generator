<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
      app
    >
      <v-app-bar-title>Excel Analysis App</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="d-flex flex-column">
      <div class="text-center">
        &copy; {{ new Date().getFullYear() }} — Excel Analysis App
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>