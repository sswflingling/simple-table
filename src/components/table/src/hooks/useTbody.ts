import { useBasicTableInner } from "./useBasicTableInner";

import { unref, computed } from "vue";

import { log } from './../logger';

import { useSortInner } from "./useSort"

export function useTbody() {
    const { data, ColumnsTbody } = useBasicTableInner();
    const { setDataSort } = useSortInner()
    const list = computed(() => {
        log.log('排序前数据', data)

        // 排序
        const tableData = setDataSort(unref(data))

        log.log('排序后数据', tableData)

        return tableData;
    });

    return {
        list,
        ColumnsTbody
    };
}
