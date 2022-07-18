<template>
  <div class="Home">
    <AppBar />
    <v-main>
      <v-layout>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"/>
      </v-layout>

      <UsersTable />
    </v-main>
  </div>
</template>

<script>
import UsersTable from '../components/UsersTable'
import AppBar from '../components/AppBar'

export default {
  name: 'Home',
  components: {
    UsersTable, AppBar
  }
}
</script>

<style lang="scss">
.Home {
  .v-app-bar {
    h2 {
      text-transform: uppercase;
    }
  }
}
</style>
