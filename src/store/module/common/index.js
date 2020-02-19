import { getCategory } from "@/api/info";

const actions = {
  GetCateType(content, requestData) {
    return new Promise((resolve, reject) => {
      //调用接口
      getCategory({}).then(response => {
        let data = response.data.data.data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}