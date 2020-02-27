import {
  getCategory,
  getCategoryall
} from "@/api/info";
import {
  GetCity
} from "@/api/user";
import {
  reactive
} from "@vue/composition-api"
export function common() {
  const TypeKey = reactive({
    data: []
  });
  const TypeAllKey = reactive({
    data: []
  });
  const cityData = reactive({
    data: []
  });
  /**
   * 获取分类
   */
  const getCateType = () => {
    getCategory().then(response => {
      TypeKey.data = response.data.data.data
      //console.log(TypeKey.data)
    }).catch(error => {

    })
  }
  const getCateTypeAll = () => {
    getCategoryall().then(response => {
      TypeAllKey.data = response.data.data
      //console.log(TypeAllKey.data)
    }).catch(error => {

    })
  }
  //获取省市区
  const getCity = () => {
    GetCity().then(res => {
      cityData.data = res.data.data[0].provinceList
    }).catch(err => {})
  }

  return {
    TypeKey,
    getCateType,
    getCateTypeAll,
    TypeAllKey,
    getCity,
    cityData
  }
}