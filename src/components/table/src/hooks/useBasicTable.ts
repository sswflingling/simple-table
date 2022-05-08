import type { Directions } from "../types/index"
import type { InjectionKey, Ref } from 'vue'

export const TableSort: InjectionKey<Ref<({
  field: string;
  order: Directions;
} | undefined)>> = Symbol()

