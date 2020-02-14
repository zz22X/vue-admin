import { GetLogin } from "@/api/login";
const state = {}
const mutations = {}
const actions = {
  Login(content, requestData) {
    return new Promise((resolve, reject) => {
      //调用接口
      GetLogin(requestData).then(response => {
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
  mutations,
  actions
}