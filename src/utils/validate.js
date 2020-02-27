/* 过滤特殊字符 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？ ]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

/* 验证邮箱 */
export function validateEmil(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value) ? true: false
}

/* 验证密码 */
export function validatePass(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value) ? true: false
}

/* 验证验证码 */
export function validateVerify(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true: false
}
/* 验证手机号 */
export function validatePhone(value) {
  let reg = /^[0-9]{11}$/;
  return !reg.test(value) ? true: false
}

/* 验证姓名 */
export function validateName(value) {
  let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  return !reg.test(value) ? true: false
}