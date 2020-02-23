<template>
  <el-table
    ref="table"
    v-loading="loading"
    element-loading-text="Loading"
    :data="tableData"
    border
    fit
    highlight-current-row
    tooltip-effect="dark"
    style="width:100%"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-for="(item,index) in tableLabel"
      :width="item.width ? item.width : ''"
      :key="index"
      :align="item.align"
      :label="item.label"
      :prop="item.param"
      :sortable="item.sortable ? 'custom' : false"
    >
      <template slot-scope="scope">
        <span v-if="item.render">{{item.render(scope.row)}}</span>
        <span v-else>{{scope.row[item.param]}}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="tableOption.label"
      :width="tableOption.width"
      :label="tableOption.label"
      align="center"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="scope">
        <el-button
          v-for="(item,index) in tableOption.options"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          @click="handleButton(item.methods,scope.row,scope.row)"
          size="mini"
        >{{item.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>