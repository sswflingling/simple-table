import { useBasicTableInner } from "./useBasicTableInner";

import { unref,computed } from "vue";

import { log } from './../logger';

export function useTbody() {
    const { data, ColumnsTbody, tableSort } = useBasicTableInner();

    const list = computed(() => {
        log.log('排序前数据', data)
        // 排序
        const tableData = unref(data)

        if (tableSort.value) {
            const field = tableSort.value.field;
            const order = tableSort.value.order;
            const column = ColumnsTbody.value?.find((item) => item.key === field);
            // 对数组的元素进行排序
            tableData.sort((a: any, b: any) => {
                if (column && typeof column.sorter === "function") {
                    return column.sorter(order, a, b);
                }

                let aval = a[field];
                let bval = b[field];

                if (typeof b[field] === "number") {
                    aval = aval || 0;
                    bval = bval || 0;
                    if (order === "ascend") {
                        return aval - bval;
                    } else {
                        return bval - aval;
                    }
                }
                // 如用的是英语，则是根据字母排序的。如果有用到汉字则是根据汉字拼音来排序
                if (typeof b[field] === "string") {
                    aval = aval || "";
                    bval = bval || "";

                    if (order === "ascend") {
                        return aval.localeCompare(bval);
                    } else {
                        return bval.localeCompare(aval);
                    }
                }

                return 0;
            });
        }else{
            tableData.sort((a, b) => a.key - b.key)
        }
        log.log('排序后数据', data)

        return tableData;
    });

    return {
        list,
        ColumnsTbody
    };
}
