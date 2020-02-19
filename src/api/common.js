import {
  getCategory,
  getCategoryall
} from "@/api/info";
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
  const ChildrenKey = reactive({
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
    }).catch(error => {

    })
  }
  return {
    TypeKey,
    getCateType,
    getCateTypeAll,
    TypeAllKey
  }
}