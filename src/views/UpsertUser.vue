<template>
  <div class="Home">
    <AppBar />
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <div>
              <v-row color="primary">
                <h1>{{$t(id ? 'createUser' : 'updateUser')}}</h1>
              </v-row>
              <v-col>
                <v-form v-model="isFormValid">
                  <v-row>
                    <v-text-field
                        v-model="first_name"
                        :label="$t('first_name')"
                        :rules="textRules"
                        name="first_name"
                        type="text"
                        required
                        class="mr-2"
                    />
                    <v-text-field
                        v-model="last_name"
                        :label="$t('last_name')"
                        :rules="textRules"
                        name="last_name"
                        type="text"
                        required
                        class="mr-2"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                        v-model="email"
                        :label="$t('email')"
                        :rules="textRules"
                        name="email"
                        type="text"
                        required
                        class="mr-2"
                    />
                  </v-row>
                </v-form>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!isFormValid" class="mb-2" color="primary" @click="save">
                  {{ $t('save') }}
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppBar from '../components/AppBar'
import { mapFields } from 'vuex-map-fields';
import {mapState} from "vuex";

export default {
  name: 'UpsertUser',
  components: {
    AppBar
  },
  data () {
    return {
      isFormValid: false,
      isRegisterForm: false,
      textRules: [
        v => !!v || `${this.$t('name')} ${this.$t('isRequired')}`
      ],
    }
  },
  computed: {
    ...mapFields('app', [
      'form.id',
      'form.first_name',
      'form.last_name',
      'form.email',
      'form.avatar',
    ]),
    ...mapState('app', [
      'loading'
    ]),
  },
  methods: {
    save () {
      if (!this.isFormValid) { return }
      this.$store.dispatch("app/save").then(() => {
        this.$router.push('/')
      });
    },
  }
}
</script>

<style lang="scss">
//.Dashboard {

//}
</style>
