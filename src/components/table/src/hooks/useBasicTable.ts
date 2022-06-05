
import type { ColumnsTheadType } from "../types/index";

import { computed, provide,  getCurrentInstance } from "vue";
import { tableColumnsThead, tableColumnsTbody } from "../types/TableInjectionKey";
import { BasicProps } from "../props";

import { log } from './../logger';

export function useBasicTable(props: BasicProps) {
	const uid = getCurrentInstance()?.uid || Math.floor(Math.random() * 1000000000);
 
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
	
	// 源码中provide不支持对象传参
	provide(tableColumnsThead, columnsThead);
	provide(tableColumnsTbody, ColumnsTbody);
}