import service from "@/utils/request"

//获取信息列表
export function getInfoList(data) {
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

//编辑信息
export function editInfoList(data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data
  })
}
//新增信息
export function addInfoList(data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}
//删除信息
export function deleteInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data
  })
}
//编辑信息分类
export function editCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}
//删除信息分类
export function deleteCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}
//获取信息分类内容
export function getCategoryall() {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/'
  })
}
//添加分类一级
export function addFirstCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',  
    data
  })
}
//添加分类子级
export function addChildrenCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',  
    data
  })
}

//获取信息分类
export function getCategory() {
  return service.request({
    method: 'post',
    url: '/news/getCategory/'
  })
}