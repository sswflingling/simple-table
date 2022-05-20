import type { ColumnsType } from "./types/index";
import type { PropType, ExtractPropTypes } from "vue";

export const basicProps = {
    data: {
        type: Array as PropType<{ [x: string]: any }[]>,
        default: ()=> []
    },
    columns: {
        type: Array as PropType<ColumnsType[]>,
        default: ()=> [],
        required: true
    }
};

export type BasicProps = Readonly<ExtractPropTypes<typeof basicProps>>;
