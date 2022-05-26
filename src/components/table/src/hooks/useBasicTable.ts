
import type { ColumnsTheadType } from "../types/index";

import { ref, computed, provide, inject, getCurrentInstance } from "vue";
import { tableData, tableSort, tableColumnsThead, tableColumnsTbody } from "../types/TableInjectionKey";
import { BasicProps } from "../props";

import { log } from './../logger';

export function useBasicTable(props: BasicProps) {
	const uid = getCurrentInstance()?.uid || Math.floor(Math.random() * 1000000000);
	// 分页
	const currentPage = ref(1);
	const pageSize = ref(10);
	const data = computed(() => 
		props.data.slice(pageSize.value*(currentPage.value - 1), pageSize.value*currentPage.value))
	// 处理表头数据为一维数组
	const columnsThead = computed<ColumnsTheadType[]>(() => {
	
		try {
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
		} catch (error) {
			log.error("数据错误",error)
			return []
		}
		
	});
	log.log('扁平化处理后的表头数据', columnsThead)

	// 表格列配置
	const ColumnsTbody = computed<ColumnsTheadType[]>(() =>
		// 筛选表头最后一级
		columnsThead.value.filter((item) => !item.children?.length)
	);

	provide(tableData, data);
	provide(tableSort, ref());

	provide(tableColumnsThead, columnsThead);
	provide(tableColumnsTbody, ColumnsTbody);

	return {
		currentPage,
		pageSize
	}
}