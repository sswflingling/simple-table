<template>
    <tbody class="table-tbody">
        <tr v-for="(row, rowIdx) in list" :key="row.id || rowIdx" class="table-tbody-tr">
            <tbody-td v-for="(col, colIdx) in ColumnsTbody"
                      :index="rowIdx"
                      :row="row"
                      :col="col"
                      :key="(row.id || rowIdx) + '' + colIdx" />
        </tr>
    </tbody>
</template>

<script lang="ts" setup>

import TbodyTd from "./tbodyTd.vue"; //内容单元格组件

import { useTbody } from "../hooks/useTbody";

const { list, ColumnsTbody } = useTbody();
</script>

<style lang="less" scoped>
.table-tbody {
    tr {
        transition: all 250ms;
        &:hover {
            background: rgba(60, 90, 100, 0.04);
        }
    }
}
</style>
