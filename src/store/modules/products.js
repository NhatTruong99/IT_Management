import request from '@/request'
// import store from '@/store'

const state = {
    products: [],
    product: {},
    totalProduct: 0
}

const mutations = {
    SET_PRODUCTS: (state, products) => {
        state.products = products
    },
    SET_PRODUCT: (state, product) => {
        state.product = product
    },
    SET_TOTAL_PRODUCT: (state, totalProduct) => {
        state.totalProduct = totalProduct
    }
}

const actions = {
    getProductList({commit}) {
        return new Promise((resolve, reject) => {
            request({
                url: '/products',
                method: 'GET'
            }).then((response) => {
                commit('SET_PRODUCTS', response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    createProduct({dispatch}, data) {
        return new Promise((resolve, reject) => {
            request({
                url: '/products',
                method: 'POST',
                data
            }).then((response) => {
                dispatch('getProductList')
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    getProduct({commit}, params) {
        return new Promise((resolve, reject) => {
            request({
                url: '/products',
                method: 'GET',
                params: params
            }).then((response) => {
                commit('SET_PRODUCT', response.data[0])
                resolve(response.data[0])
            }).catch((error) => {
                reject(error)
            })
        })
    },
    
    updateProduct({commit}, {params, data}) {
        console.log(params, data);
        return new Promise((resolve, reject) => {
            request({
                url: `/products/${params.id}`,
                method: 'PUT',
                data: data
            }).then((response) => {
                commit('SET_PRODUCT', response.data)
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