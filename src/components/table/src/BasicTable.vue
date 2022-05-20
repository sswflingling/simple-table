<template>
    <div class="basic-table">
        <div class="table">
            <table class="table-box table-border"
                   ellspacing="0"
                   cellpadding="0"
                   border="0">
                <Thead />
                <Tbody />
            </table>
        </div>

    <div class="pagination">4555</div>
    </div>
</template>


<script lang="ts" setup>

import Thead from "./components/Thead.vue"; //表头组件
import Tbody from "./components/Tbody.vue"; // 表格内容组件

import { basicProps } from "./props";
import { useBasicTable } from "./hooks/useBasicTable";

const props = defineProps(basicProps);

useBasicTable(props);

</script>
<style lang="less" scoped>
.basic-table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .table {
        height: 100%;
        flex: 1;
        overflow: hidden;
        overflow: auto;
        .table-box {

            &:deep(.table-thead) {
                flex-shrink: 0;
            }

            &:deep(.table-tbody) {
                flex: 1;
                overflow: hidden;
                overflow-y: auto;
                position: relative;
            }
        }
    }

    .pagination {
        flex-shrink: 0;
    }
    .table-border {
        border: 1px solid #eee;
        border-bottom: none;
        border-right: none;

        &:deep(th),
        &:deep(td) {
            border: 1px solid #eee;
            border-top: none;
            border-left: none;
        }
    }
}
</style>
