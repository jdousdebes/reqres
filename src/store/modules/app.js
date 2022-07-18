import { getField, updateField } from 'vuex-map-fields';
import axios from "axios";

const state = {
    form: {
        id: null,
        avatar: null,
        email: null,
        first_name: null,
        last_name: null,
    },
    users: [],
    paginationVariables: {
        page: 1,
        itemsPerPage: 99,
    },
    loading: true,
};

const apiUrl = 'https://reqres.in/api/users';

// getters
const getters = {
  getField,
};

// actions
const actions = {
    getAll(store, force = false) {
        if (!force && state.users.length > 0 ) return;
        this.commit('app/SET_LOADING', true);
        axios.get(apiUrl, {
            params: {
                page: state.paginationVariables.page,
                itemsPerPage: state.paginationVariables.itemsPerPage
            }
        }).then(response => {
            this.commit('app/GET_ALL', response.data);
            this.commit('app/SET_LOADING', false);
        }).catch(error => {
            console.error(error);
        })
    },
    async save() {
        this.commit('app/SET_LOADING', true);
        let url = apiUrl;
        if (state.form.id) url = url + '/' + state.form.id;

        try {
            const response = await axios.post(url, {
                ...state.form
            })
            this.commit('app/UPSERT_USER', response.data);
            this.commit('app/SET_LOADING', false);
        } catch (error) {
            console.error(error);
        }
    }
};

// mutations
const mutations = {
    GET_ALL(state, data) {
        state.users = data.data;
        state.paginationVariables.page = data.page;
        state.paginationVariables.pageCount = data.total_pages;
    },
    SET_USER(state, data) {
        state.form = data.data;
    },
    DELETE_USER(state, data) {
        const userIndex = state.users.findIndex(user => user.id == data.id);
        state.users.splice(userIndex, 1);
    },
    UPSERT_USER(state, data) {
        const userIndex = state.users.findIndex(user => user.id == data.id);
        if (userIndex >= 0) {
            state.users[userIndex] = data;
        } else {
            state.users.push(data);
        }
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_PAGE(state, page) {
      state.paginationVariables.page = page;
    },
    RESET_USER(state) {
        state.form = {
            id: null,
            avatar: null,
            email: null,
            first_name: null,
            last_name: null,
        };
    },
    RESET_USERS(state) {
        state.users = [];
    },
    updateField,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
