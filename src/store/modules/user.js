import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    name:'',
    username:'',
    token: getToken(),
    query: [],
    update: [],
    pquery: [],
    pupdate: []
  },

  mutations: {
    SET_USERNAME:(state,username)=>{
      state.username=username
    },
    SET_NAME:(state,name)=>{
      state.name=name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // SET_QUERY: (state, query) => {
    //   state.query = query
    // },
    // SET_UPDATE: (state, update) => {
    //   state.update = update
    // },
    // SET_PQUERY: (state, pquery) => {
    //   state.pquery = pquery
    // },
    // SET_PUPDATE: (state, pupdate) => {
    //   state.pupdate = pupdate
    // }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // const data = response.data
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          commit('SET_USERNAME',response.username)
          commit('SET_NAME',response.name)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // const data = response.data
          commit('SET_TYPE', response.type)
          // commit('SET_UPDATE', response.update)
          // commit('SET_PQUERY', response.pquery)
          // commit('SET_PUPDATE', response.pupdate)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(response => {
        
          commit('SET_TOKEN', '')
          commit('SET_QUERY', [])
          commit('SET_UPDATE', [])
          commit('SET_PQUERY', [])
          commit('SET_PUPDATE', [])
          commit('SET_USERNAME','')
          commit('SET_NAME','')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
