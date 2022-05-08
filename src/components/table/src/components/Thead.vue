<script lang="tsx">
import type { PropType } from "vue";
import type { ColumnsTheadType, Directions } from "../types";

import { defineComponent, computed, inject, ref } from "vue";

import CaretUpIcon from "../icon/CaretUpIcon.vue";
import CaretDownIcon from "../icon/CaretDownIcon.vue";

import { TableSort } from "../hooks/useBasicTable";

import { insertRule, updateRule } from "../utils";

export default defineComponent({
    props: {
        columns: {
            type: Array as PropType<ColumnsTheadType[]>,
            default: () => [],
        },
    },
    setup(props) {
        const tableSort = inject(TableSort, ref());

        // 找出多表头最大层级
        const maxPowspan = computed<number>(() =>
            Math.max(...props.columns.map((item) => item.level))
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

        // 拖动单元格
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
        function onSort(item: ColumnsTheadType, directions?: Directions, e?: Event) {
            e?.stopPropagation();
            if (!item.key) return;

            if (directions) {
                return (tableSort.value = {
                    field: item.key,
                    order: directions,
                });
            }

            if (tableSort.value?.field !== item.key || !tableSort.value?.order) {
                return (tableSort.value = {
                    field: item.key,
                    order: "ascend",
                });
            }

            if (tableSort.value?.order === "descend") {
                return (tableSort.value = undefined);
            }

            if (tableSort.value?.order === "ascend") {
                return (tableSort.value = {
                    field: item.key,
                    order: "descend",
                });
            }
        }

        // 排序图标
        function renderSortIcon(item: ColumnsTheadType) {
            return item.sorter ? (
                <div class="sort">
                    <div class={["icon", tableSort.value?.field === item.key && tableSort.value?.order === "ascend" && "active"]}
                        onClick={(e) => onSort(item, "ascend", e)}>
                        <CaretUpIcon />
                    </div>
                    <div class={["icon", tableSort.value?.field === item.key && tableSort.value?.order === "descend" && "active"]}
                        onClick={(e) => onSort(item, "descend", e)}>
                        <CaretDownIcon />
                    </div>
                </div>
            ) : (
            ""
            );
        }

        // 渲染表头列
        function renderTh(item: ColumnsTheadType, level: number) {
            const rowspan = item.children?.length ? 1 : maxPowspan.value - level + 1;
            const colspan = item.children?.length ? getColspan(item) : 1;
            // 动态添加类名
            insertRule(item.classResize,
                      `{width:${item.width ? item.width + "px" : "auto"};text-align:${
                            item.children?.length ? "center" : item.align || "left"
                      }}`
            );
            return (
                <th rowspan={rowspan}
                    colspan={colspan}
                    class={{ "cursor-pointer": item.sorter }}
                    onClick={() => item.sorter && onSort(item)}>

                    <div class={["content", item.classResize]}>
                        <div class="title">{item.title}</div>
                        <div class="operate">{renderSortIcon(item)}</div> 
                        {item.isColResize === true && !item.children?.length ? (
                        <div class="resize"
                            onClick={(e) => e.stopPropagation()}
                            onMousedown={(e) => onMousedown(e, item)} />
                        ) : (
                            ""
                        )}
                    </div>
                </th>
            );
        }

        // 渲染表头行
        function renderTr(level: number) {
            return (
            <tr>
                {props.columns
                .filter((item) => item.level == level)
                .map((item) => renderTh(item, level))}
            </tr>
            );
        }

        return () => (
            <thead class="table-thead">
                {[...Array(maxPowspan.value)].map((item, idx) => renderTr(idx + 1))}
            </thead>
        );
    },
});
</script>
<style lang="less" scoped>
.table-thead {
    background-color: #fafafa;
    th {
        padding: 5px 0;
        color: #333;
        font-weight: 400;
        font-size: 14px;
        position: relative;

        .content {
            height: 28px;
            line-height: 28px;
            display: flex;
            align-items: center;

            .title {
                flex: 1;
                padding: 0 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .operate {
                flex-shrink: 0;

            .sort {
                padding-right: 10px;
                display: flex;
                flex-direction: column;

                .icon {
                    width: 14px;
                    height: 8px;
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    color: #bbb;
                    transition: all 200ms;

                    &:hover {
                        color: #666;
                    }
                }

                .active {
                    color: #333;
                }
            }
        }

            .resize {
                position: absolute;
                top: 0;
                z-index: 10;
                right: -5px;
                width: 10px;
                height: 100%;
                cursor: col-resize;
                user-select: none;
            }
        }
    }
    .cursor-pointer {
        cursor: pointer;
        user-select: none;
    }
}
</style>
