import { tableData } from "../types/TableInjectionKey";
import { ref, computed, provide } from "vue"

// 分页
export function usePagination(list: any) {
	const currentPage = ref(1);
	const pageSize = ref(10);
	const data = computed(() => list.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value))

	provide(tableData, data);
	return {
		data,
		currentPage,
		pageSize
	}
}