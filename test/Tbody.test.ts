import { MountingOptions, mount, shallowMount } from "@vue/test-utils";
import { expect, test, describe } from "vitest";

import type { BasicProps } from "../src/components/table/src/props";

import Table from '../src/App.vue'
import BasicTable from '../src/components/table/src/BasicTable.vue'
import { columns, data } from "../src/data";

// let _wrapper;
// beforeEach(async () => {
//     // 在每次测试运行之前清除模拟并添加一些测试数据
// })

describe('Table', () => {
    describe('basic work', () => {
        const TableMount = (options?: MountingOptions<Partial<BasicProps>>) =>  {
            const { props } = options || {};
            const mergedOptions = {
                props: { columns, data, ...props }
            } as MountingOptions<BasicProps>
            return mount(Table, mergedOptions)
        }
        

        test('tbody work', async () => {
            const wrapper = TableMount();
            expect(wrapper.find('tbody').classes()).toContain('table-tbody');
            expect(wrapper.find('tbody').findAll('tr')[0].classes()).toContain('table-tbody-tr');
        })

        test('thead work', () => {
            const wrapper = TableMount();
            expect(wrapper.find('thead').classes()).toContain('table-thead');
        })

        // test('tableCell work', () => {
        //     const wrapper = TableMount();
        //     expect(wrapper.find('thead').classes()).toContain('table-thead');
        // })
        
        // test('sort work', () => {
            // const wrapper = TableMount();
            // expect(wrapper.find('th').classes()).toContain('cursor-pointer');
        // })

        test('pagination work', async() => {
            const wrapper = TableMount();
            const paginationWrapper = shallowMount(BasicTable,{
                props: {
                    pageSize: 10,
                    total: 50
                }
            })
            expect(paginationWrapper.html()).toMatchSnapshot();
            // expect(wrapper.find('tbody').findAll('tr').length).toBe(10)

            // await paginationWrapper.setProps({pageSize: 20 })

            // expect(wrapper.find('tbody').findAll('tr').length).toBe(20)
            // expect(wrapper.findAll('.ix-pagination-item').length).toEqual(7)
        })

    })

    
})
