<script lang="tsx">
import type { ColumnsTheadType } from "../types";

import { defineComponent } from "vue";

import CaretUpIcon from "../icon/CaretUpIcon.vue";
import CaretDownIcon from "../icon/CaretDownIcon.vue";

import { useThead } from "../hooks/useThead";

import { insertRule } from "../utils";

export default defineComponent({
    setup(props) {
        const {
            tableSort,
            maxPowspan,
            columnsThead,
            getColspan,
            onMousedown,
            onSort,
        } = useThead();

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
                {columnsThead.value
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
