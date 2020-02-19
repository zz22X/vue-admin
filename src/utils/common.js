//js时间戳转普通日期
export function formatDate(timestamp) {
  let now = new Date(timestamp * 1000)
  let year = now.getFullYear(); //取得4位数的年份
  let month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  let date = now.getDate(); //返回日期月份中的天数（1到31）
  let hour = now.getHours(); //返回日期中的小时数（0到23）
  let minute = now.getMinutes(); //返回日期中的分钟数（0到59）
  let second = now.getSeconds(); //返回日期中的秒数（0到59）
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
//let g=1551334252272; 定义一个时间戳变量
//let d=new Date(g);   创建一个指定的日期对象