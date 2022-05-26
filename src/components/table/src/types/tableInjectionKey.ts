import type { Directions, ColumnsTheadType } from "../types/index";
import type { InjectionKey, Ref, ComputedRef } from "vue";

export const tableSort: InjectionKey<Ref<{ field: string; order: Directions } | undefined>> = Symbol();
export const tableData: InjectionKey<ComputedRef<{[x:string]:any}[]>|{[x:string]:any}[]> = Symbol();
export const tableColumnsThead: InjectionKey<ComputedRef<ColumnsTheadType[]>> = Symbol();
export const tableColumnsTbody: InjectionKey<ComputedRef<ColumnsTheadType[]>> = Symbol();