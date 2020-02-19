import {
  MessageBox
} from 'element-ui';
import {
  Message
} from 'element-ui';
import {
  reactive,
  onMounted,
  ref
} from "@vue/composition-api";
export function global() {
  const str = ref('')
  const MsgBox = (info) => {
    MessageBox.confirm(info.content, info.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: info.type || "warning",
        center: true
      })
      .then(() => {
        str.value = info.id || ''
        info.fn && info.fn(info.id || '')
      })
      .catch(() => {
        info.catchFn && info.catchFn(info.id || '')
      });
  }
  return {
    MsgBox,
  }
}