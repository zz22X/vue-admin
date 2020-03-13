import req from "@/utils/request2"


export function AddUserInfo(data) {
  return req.request({
    method: 'post',
    url: '/addUserInfo',
    data
  })
}
export function EditUserInfo(data) {
  return req.request({
    method: 'post',
    url: '/editUserInfo',
    data
  })
}
export function GetUserInfo(data) {
  return req.request({
    method: 'post',
    url: '/getUserInfo',
    data
  })
}
export function GetCity() {
  return req.request({
    method: 'get',
    url: '/pcdetail'
  })
}
export function DeleteUserInfo(data) {
  return req.request({
    method: 'post',
    url: '/deleteUserInfo',
    data
  })
}

export function SearchUserInfo(data) {
  return req.request({
    method: 'post',
    url: '/searchUserInfo',
    data
  })
}


export function loadTableData(params) {
  return req.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {}
  })
}