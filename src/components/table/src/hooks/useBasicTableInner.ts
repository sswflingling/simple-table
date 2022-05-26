import type { ComputedRef } from "vue";
import type { ColumnsTheadType } from "../types";

import { ref, inject } from "vue";

import { tableData, tableSort, tableColumnsThead, tableColumnsTbody } from "../types/TableInjectionKey";

export function useBasicTableInner() {
    return {
        data: inject(tableData, []),
        tableSort: inject(tableSort, ref()),
        columnsThead: inject(tableColumnsThead) as ComputedRef<ColumnsTheadType[]>,
        ColumnsTbody: inject(tableColumnsTbody) as ComputedRef<ColumnsTheadType[]>,
    };
}
