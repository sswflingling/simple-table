import type { ColumnsTheadType, Directions } from "../types";

import { computed } from "vue";
import { updateRule } from "../utils";
import { useBasicTableInner } from "./useBasicTable";

import { log } from './../logger';

export function useThead() {
    const { tableSort, columnsThead } = useBasicTableInner();
    // 找出多表头最大层级
    const maxPowspan = computed<number>(() =>
        Math.max(...columnsThead?.value.map((item) => item.level))
    );
    // 获取占的宽度
    function getColspan(item: ColumnsTheadType) {
        let len = 0;
        item.children?.forEach((cItem) => {
            if (cItem.children?.length) {
                len += getColspan(cItem);
            } else {
                len += 1;
            }
        });
        return len;
    }
  // 实现宽度大小拖动
  function onMousedown(e: MouseEvent, item: ColumnsTheadType) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.cursor = "col-resize !important";
        const parent = (e.target as HTMLElement).parentElement as HTMLElement;
        const offsetWidth = parent?.offsetWidth || 0;

        const startMove = (el: MouseEvent) => {
            el.preventDefault();
            el.stopPropagation();
            let w = offsetWidth + el.clientX - e.clientX;
            w = w < 80 ? 80 : w;
            updateRule(item.classResize, {
                width: w + "px",
            });
        };

        const endMove = () => {
            document.body.style.cursor = "";
            document.removeEventListener("mousemove", startMove);
            document.removeEventListener("mouseup", endMove);
        };

        document.addEventListener("mousemove", startMove);
        document.addEventListener("mouseup", endMove);
  }

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

    return {
        tableSort,
        maxPowspan,
        columnsThead,
        getColspan,
        onMousedown,
        onSort
    };
}
