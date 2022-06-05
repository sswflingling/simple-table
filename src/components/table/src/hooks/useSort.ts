import type { ColumnsTheadType, Directions } from "../types";
import { tableSort } from "../types/TableInjectionKey";

import { ref, provide } from "vue"

import { useBasicTableInner } from "./useBasicTableInner";

export function useSort() {
    const sortData = ref<{ field: string; order: Directions } | undefined>();
    provide(tableSort, sortData);
}

export function useSortInner() {
    const { tableSort, ColumnsTbody } = useBasicTableInner()

    // 排序
    function onSort(item: ColumnsTheadType, dire?: Directions, e?: Event) {
        e?.stopPropagation();
        if (!item.key) return;

        if (dire) {
            return (tableSort.value = {
                field: item.key,
                order: dire
            });
        }

        if (tableSort.value?.field !== item.key || !tableSort.value?.order) {
            return (tableSort.value = {
                field: item.key,
                order: "ascend"
            });
        }

        if (tableSort.value?.order === "descend") {
            return (tableSort.value = undefined);
        }

        if (tableSort.value?.order === "ascend") {
            return (tableSort.value = {
                field: item.key,
                order: "descend"
            });
        }
    }

    function setDataSort(data: any) {
        if (!tableSort.value) return data

        const list = [].concat(data)
        const field = tableSort.value.field;
        const order = tableSort.value.order;
        const column = ColumnsTbody.value?.find((item) => item.key === field);
        // 对数组的元素进行排序
        list.sort((a: any, b: any) => {
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

        return list;
    }

    return {
        tableSort,
        onSort,
        setDataSort
    }

}