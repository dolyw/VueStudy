// 配置 store
import Vue from 'vue'
import Vuex from 'vuex'

// 通过 Vue.use() 安装 Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    reduced (state) {
      state.count--
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    reducedAsync ({ commit }) {
      setTimeout(() => {
        commit('reduced')
      }, 1000)
    }
  }
})

export default store
