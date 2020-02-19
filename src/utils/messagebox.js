import {
  MessageBox
} from 'element-ui';
import {
  Message
} from 'element-ui';
export default {
  install(Vue, options) {
    Vue.prototype.MessageBox = (info) => {
      MessageBox.confirm(info.content, info.tip || "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: info.type || "warning",
          center: true
        })
        .then(() => {
          info.fn && info.fn()
          Message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
}

//vue插件