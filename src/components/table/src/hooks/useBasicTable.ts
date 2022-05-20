import type { Directions, ColumnsTheadType } from "../types/index";
import type { InjectionKey, Ref, ComputedRef } from "vue";

import { ref, computed, provide, inject, getCurrentInstance } from "vue";

import { BasicProps } from "../props";

export const tableSort: InjectionKey<Ref<{ field: string; order: Directions } | undefined>> = Symbol();
export const tableData: InjectionKey<{[x:string]:any}[]> = Symbol();
export const tableColumnsThead: InjectionKey<ComputedRef<ColumnsTheadType[]>> = Symbol();
export const tableColumnsTbody: InjectionKey<ComputedRef<ColumnsTheadType[]>> = Symbol();

export function useBasicTable(props: BasicProps) {
	const uid = getCurrentInstance()?.uid || Math.floor(Math.random() * 1000000000);
	
	// 处理表头数据为一维数组
	const columnsThead = computed<ColumnsTheadType[]>(() => {
		if(Array.isArray(props.columns)) {
			console.warn('表头数据格式错误')
			// return
		}
		if(Array.isArray(props.data)) {
			console.warn('表格数据格式错误')
			// return
		}
		let i = 0;
		const flatten = (
			data: ColumnsTheadType[],
			level = 1,
			parent?: ColumnsTheadType
		) =>
		data.reduce((acc: ColumnsTheadType[], v) => {
			i += 1;
			v.classResize = "column-cell-" + uid + "-" + i;
			v.level = level;
			v.parent = parent;
			acc.push(v);
			if (v.children) {
				acc.push(...flatten(v.children as ColumnsTheadType[], level + 1, v));
			}
			return acc;
		}, []);
		return flatten(props.columns as ColumnsTheadType[], 1);
	});
	console.log('扁平化处理后的表头数据', columnsThead)

	// 表格列配置
	const ColumnsTbody = computed<ColumnsTheadType[]>(() =>
		// 筛选表头最后一级
		columnsThead.value.filter((item) => !item.children?.length)
	);

	provide(tableData, props.data);
	provide(tableSort, ref());

	provide(tableColumnsThead, columnsThead);
	provide(tableColumnsTbody, ColumnsTbody);
}

export function useBasicTableInner() {
	return {
		data: inject(tableData, []),
		tableSort: inject(tableSort, ref())  ,
		columnsThead: inject(tableColumnsThead) as ComputedRef<ColumnsTheadType[]>,
		ColumnsTbody: inject(tableColumnsTbody) as ComputedRef<ColumnsTheadType[]>,
	};
}
