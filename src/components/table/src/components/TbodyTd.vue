<script lang="tsx">
import type { PropType } from "vue";
import type { ColumnsTheadType } from "../types";

import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        index: Number,
        col: Object as PropType<ColumnsTheadType>,
        row: Object as any,
    },
    setup(props) {
        // 渲染单元格内容
        function renderContent() {
            const keys = (props.col?.key || "").split(".");
            let res: any = props.row;
            // 表头数据“key”属性值与表格数据属性名相匹配
            keys.forEach((key) => {
                if (res[key]) {
                    res = res[key];
                }
            });

            const dataType = typeof res;
            let content = dataType === "string" || dataType === "boolean" || dataType === "number" ? res : "";
            // 判断有render函数，该函数用来自定内容值
            if (props.col?.render) {
                content = props.col.render({
                    content,
                    index: props.index || 0,
                    row: props.row,
                    col: props.col,
                });
            }
            
            return typeof content === "object" ? content : <span>{content}</span>;
        }

        return () => (
            <td>
                <div class={props.col?.classResize}>
                    <div class="cell">{renderContent()}</div>
                </div>
            </td>
        );
    },
});
</script>
<style lang="less" scoped>
td {
    padding: 5px 0;
    .cell {
        height: 26px;
        line-height: 26px;
        padding: 0 15px;
        color: #666;
        font-size: 14px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
