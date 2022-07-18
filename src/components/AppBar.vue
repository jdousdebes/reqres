<template>
  <v-app-bar class="AppBar elevation-2" app>
    <h2 @click="$router.push({ path: 'home' })">{{ $t('appname') }}</h2>
    <v-spacer></v-spacer>
    <v-btn text><LocaleChanger /></v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon @click="toggleThemeDarkMode">
          <v-icon :style="{transform: `rotate(${$vuetify.theme.dark ? 0 : -190 }deg)`}">
            {{ icons.mdiThemeLightDark }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t(($vuetify.theme.dark ? 'light' : 'dark') + 'Mode') }}</span>
     </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import { mdiThemeLightDark } from '@mdi/js'
import LocaleChanger from '../components/LocaleChanger'

export default {
  name: 'AppBar',
  components: {
    LocaleChanger
  },
  data () {
    return {
      icons: { mdiThemeLightDark }
    }
  },
  computed: {
    ...mapState('User', [
      'user'
    ]),
  },
  methods: {
    toggleThemeDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style lang="scss">
.AppBar {
  h2 {
    cursor: pointer;
    text-transform: uppercase;
  }
}
</style>
