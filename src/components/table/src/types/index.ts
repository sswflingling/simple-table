import type { VNode } from "vue"

export type Directions = 'ascend' | 'descend' // ascend:顺序 descend:倒叙

// 表头数据类型
export interface ColumnsType {
    title: string;
    key?: string;
    width?: number;
    align?: 'left' | 'right' | 'center';
    isColResize?: boolean; // 是否可拉动列宽
    children?: ColumnsType[];
    render?: (obj: { content: string; index: number; row: any; col: ColumnsTheadType; }) => string | number | VNode; // 
    sorter?: ((directions: Directions, a: any, b: any) => number) | boolean;
    fixed?: 'left' | 'right';
}

export interface ColumnsTheadType extends ColumnsType {
    level: number;
    classResize: string;
    parent?: ColumnsTheadType;
    children?: ColumnsTheadType[];
}