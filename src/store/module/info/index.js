const state = {
  infoDetail: "" || sessionStorage.getItem("InfoDetail")

}
const getters = {
  info: state => state.infoDetail
}
const mutations = {
  InfoDetail(state, value) {
    state.infoDetail = value;
    sessionStorage.setItem("InfoDetail", JSON.stringify(value))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}