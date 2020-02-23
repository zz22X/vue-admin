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
    <el-table-column :type="selectionType" width="55" align="center"></el-table-column>
    <el-table-column
      v-for="(item, index) in tableColumn"
      :key="index"
      :formatter="toFormatter"
      :type="item.type"
      :ref="item.ref"
      :prop="item.param"
      :label="item.label"
      :width="item.width ? item.width : ''"
      align="center"
    >
      <template slot-scope="scope">
        <span v-if="item.render">
          <el-switch
            v-if="item.render"
            v-model="scope.row[item.param]"
            :active-color="item.activecol"
            :inactive-color="item.inactivecol"
            @change="handleSwitch(item.methods,scope.index,scope.row,item.param)"
          ></el-switch>
        </span>
        <span v-else>{{scope.row[item.param]}}</span>
      </template>
    </el-table-column>
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
    selectionType: {
      type: String,
      default: "selection"
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableColumn: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, { emit }) {
    const handleButton = (methods, row, index) => {
      // 按钮事件
      emit("handlebutton", { methods: methods, row: row, index: index });
    };

    const handleSelectionChange = val => {
      emit("handleselectionchange", val);
    };

    const handleSwitch = (methods, row, index, param) => {
      emit("handleswitch", {
        methods: methods,
        row,
        index,
        param: param
      });
    };

    const toFormatter = row => {
      return emmit("toformatter", row);
    };
    return {
      toFormatter,
      handleButton,
      handleSelectionChange,
      handleSwitch
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