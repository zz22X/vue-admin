import service from "@/utils/request"

/*获取验证码 */
export function GetSms(data) {
  return service.request({
    method: 'post',
    url: '/getSms/',
    data //data: data 左边为后台接受 右边为接受参数
  })
}

/*注册 */
export function GetRegister(data) {
  return service.request({
    method: 'post',
    url: '	/register/',
    data //data: data 左边为后台接受 右边为接受参数
  })
}

/*登录 */
export function GetLogin(data) {
  return service.request({
    method: 'post',
    url: '	/login/',
    data //data: data 左边为后台接受 右边为接受参数
  })
}