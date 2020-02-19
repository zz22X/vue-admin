import { GetLogin } from "@/api/login";
import { setToken, setUsername, getUsername } from "@/utils/app"
const state = {
  token: '',
  username: getUsername() || ''
}
const getters = {
  username : state => state.username
}
const mutations = {
  setToken(state, value) {
    state.token = value;
  },
  setUsername(state, value) {
    state.username = value;
  }
}
const actions = {
  Login(content, requestData) {
    return new Promise((resolve, reject) => {
      //调用接口
      GetLogin(requestData).then(response => {
        console.log(response)
        //token username
        let data = response.data.data
        content.commit('setToken', data.token)
        content.commit('setUsername', data.username)
        setToken(data.token)
        setUsername(data.username)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}