<template>
  <el-table
    id="vue_table"
    :data="tableData"
    border
    style="width: 100%; text-align: center"
    v-loading="loading"
    ref="TableData"
    @selection-change="handleSelectionChange"
  >
    <!-- 下拉选择框-->
    <el-table-column :type="selectionType" width="55" align="center" v-if="selectionType" />
    <!-- 文本框-->
    <el-table-column
      v-for="(item, index) in tableColumn"
      :key="index"
      v-model="item.param"
      :formatter="toFormatter"
      :type="item.type"
      :ref="item.ref"
      :prop="item.param"
      :label="item.label"
      :width="item.width ? item.width : ''"
      align="center"
    >
    <!-- 开关 或其他需要的内容-->
      <template slot-scope="scope">
        <span v-if="item.render">
          <el-switch
            v-if="item.render"
            v-model="scope.row[item.param]"
            :active-color="item.activecol"
            :inactive-color="item.inactivecol"
            @change="handleSwitch(item.methods,scope.index,scope.row)"
          ></el-switch>
        </span>
        <span v-else>{{scope.row[item.param]}}</span>
      </template> 
    </el-table-column>
    <!-- 按钮区-->
    <el-table-column
      v-if="tableOption.label"
      :width="tableOption.width"
      :label="tableOption.label"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          v-for="(item,index) in tableOption.options"
          :key="index"
          :type="item.type"
          @click="handleButton(item.methods,scope.index,scope.row)"
          size="mini"
        >{{item.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { reactive } from "@vue/composition-api";
//3.0
//import { reactive, onMounted, ref, watch } from "@vue/composition-api";
export default {
  name: "Table",
  props: {
    /* 下拉选择  type:selection  可以不从父组件接收 **/
    selectionType: {    
      type: String,
      default: "selection"
    },
    /* 加载loading **/
    loading: {
      type: Boolean,
      default: false
    },
    /* 表头 **/
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 文本框内容 数据 **/
    tableColumn: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 按钮 **/
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, { emit }) {
    const handleButton = (methods, row, index) => {
      // 按钮点击事件
      emit("handlebutton", { methods: methods, row: row, index: index });
    };
    //下拉选择器 选中值的变化
    const handleSelectionChange = val => {
      emit("handleselectionchange", val);
    };
    //开关点击事件
    const handleSwitch = (methods, row, index, param) => {
      emit("handleswitch", {
        methods: methods,
        row,
        index,
        param: param
      });
    };
    const switchModel = (val) => {
      console.log(val)
    }
    //可能没用的 格式变化事件
    const toFormatter = row => {
      return emmit("toformatter", row);
    };
    return {
      toFormatter,
      handleButton,
      handleSelectionChange,
      handleSwitch,
      toFormatter,
      switchModel
    };
  }
};
</script>

<style>
#vue_table .el-table th > .cell {
  text-align: center;
  font-size: 15px;
  color: #344a5f;
}
#vue_table .el-table .cell {
  text-align: center;
  color: #344a5f;
}
#vue_table .console .el-table__header .el-table_1_column_6 {
  border-right: 0;
}
</style>