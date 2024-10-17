import request from '@/request'
// import store from '@/store'

const state = {
    hardwares: [],
    hardware: {}
}

const mutations = {
    SET_HARDWARES: (state, hardwares) => {
        state.hardwares = hardwares
    },
    SET_HARDWARE: (state, hardware) => {
        state.hardware = hardware
    }
}

const actions = {
    getHardwareList({commit}) {
        return new Promise((resolve, reject) => {
            request({
                url: '/hardwares',
                method: 'GET'
            }).then((response) => {
                commit('SET_HARDWARES', response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    createHardware({dispatch}, data) {
        return new Promise((resolve, reject) => {
            request({
                url: '/hardwares',
                method: 'POST',
                data
            }).then((response) => {
                dispatch('getHardwareList')
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    getHardware({commit}, params) {
        return new Promise((resolve, reject) => {
            request({
                url: '/hardwares',
                method: 'GET',
                params: params
            }).then((response) => {
                commit('SET_HARDWARE', response.data[0])
                resolve(response.data[0])
            }).catch((error) => {
                reject(error)
            })
        })
    },
    
    updateHardware({commit}, {params, data}) {
        return new Promise((resolve, reject) => {
            request({
                url: `/hardwares/${params.id}`,
                method: 'PUT',
                data: data
            }).then((response) => {
                commit('SET_HARDWARE', response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}