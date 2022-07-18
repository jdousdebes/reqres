<template>
  <v-container>
    <v-layout column>
      <v-layout justify-end class="py-4">
        <v-btn color="primary" @click="create">
          <span class="mr-2">{{ $t('create') }}</span>
        </v-btn>
      </v-layout>
      <v-data-table
          :headers="headers"
          :items="users"
          :page.sync="paginationVariables.page"
          :items-per-page="99"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
      >
        <template v-slot:item.avatar="{ item }">
          <v-img cover :src="item.avatar ? item.avatar : require('../assets/user.jpeg')" height="64" width="64" class="my-1 rounded-circle"/>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              class="mr-2"
              @click="editItem(item)"
          >
            {{ icons.mdiPencil }}
          </v-icon>
          <v-icon
              @click="deleteItem(item)"
          >
            {{ icons.mdiDelete }}
          </v-icon>
        </template>
      </v-data-table>
      <v-layout justify-center class="pt-2">
        <v-pagination
            :value="paginationVariables.page"
            :length="paginationVariables.pageCount"
            @input="changePage"
        ></v-pagination>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import {mdiDelete, mdiPencil} from "@mdi/js";
import { mapState} from 'vuex';

export default {
  name: "UsersTable",
  data() {
    return {
      hasData: false,
      icons: { mdiDelete, mdiPencil }
    }
  },
  computed: {
    headers() {
      return [
        {text: this.$t('id'), value: 'id', sortable: false},
        {text: this.$t('avatar'), value: 'avatar', sortable: false},
        {text: this.$t('email'), value: 'email', sortable: false},
        {text: this.$t('first_name'), value: 'first_name', sortable: false},
        {text: this.$t('last_name'), value: 'last_name', sortable: false},
        {text: this.$t('actions'), value: 'actions', sortable: false},
      ]
    },
    ...mapState('app', [
      'users',
      'loading',
      'paginationVariables',
    ]),
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      await this.$store.dispatch("app/getAll");
    },
    create() {
      this.$store.commit('app/RESET_USER');
      this.$router.push('/users/upsert');
    },
    changePage(page) {
      this.$store.commit('app/SET_PAGE', page);
      this.$store.dispatch("app/getAll", true);
    },
    editItem(item) {
      this.$store.commit('app/SET_USER', { data: item });
      this.$router.push('/users/upsert');
    },
    deleteItem(item) {
      this.$store.commit('app/DELETE_USER', item);
    },
  }
}
</script>

<style scoped>

</style>