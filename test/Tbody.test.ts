import { MountingOptions, mount, shallowMount } from "@vue/test-utils";
import { expect, test, describe } from "vitest";

import type { BasicProps } from "../src/components/table/src/props";
import type { ColumnsType } from "@/components/table";

import Table from "../src/App.vue";

import { columns, data } from "../src/data";
import { h } from "vue"

const makeData = (length: number) =>
  Array.from({ length }, (_, i) => ({
    key: i,
    name: Math.random().toString(30),
    age: Math.floor(Math.random() * 100),
    street: "Lake Park",
    building: "C",
    number: Math.floor(Math.random() * 200),
    companyAddress:
      "Lake Street 42 BuildingBuildingBuildingBuildingBuildingBuilding",
    companyName: "SoftLake Co",
    gender: "M",
    user: {
      name: "小蛮",
    },
  }));

  const makeColumnsData: ColumnsType[] = [
    {
        title: "用户名",
        key: "name",
        width: 100,
        fixed: "left",
        align: "center",
        isColResize: true,
        sorter: true
    },
    {
        title: "Other",
        children: [
            {
                title: "Age",
                key: "age",
                width: 200,
                render: ({ content }) => h('div', {}, content),
                sorter: true
            },
            {
                title: "Address",
                children: [
                    {
                        title: "Street",
                        key: "street",
                        width: 200
                    },
                    {
                        title: "BuildingBuildingBuildingBuildingBuildingBuilding",
                        key: "building",
                        width: 100,
                        isColResize: true
                    },
                    {
                        title: "Door No.",
                        key: "number",
                        width: 100,
                        sorter: (order, a, b) => {
                            if (order === "ascend") {
                                return a.number - b.number;
                            } else {
                                return b.number - a.number;
                            }
                        }
                    }
                ]
            }
        ]
    },

  ]

// let _wrapper;
// beforeEach(async () => {
//     // 在每次测试运行之前清除模拟并添加一些测试数据
// })

describe("Table", () => {
  describe("basic work", () => {
    const TableMount = (options?: MountingOptions<Partial<BasicProps>>) => {
      const { props } = options || {};
      const mergedOptions = {
        props: { columns, data, ...props },
      } as MountingOptions<BasicProps>;
      return mount(Table, mergedOptions);
    };

    test("tbody work", async () => {
      const wrapper = TableMount();
      expect(wrapper.find("tbody").classes()).toContain("table-tbody");
      expect(wrapper.find("tbody").findAll("tr")[0].classes()).toContain(
        "table-tbody-tr"
      );
    });

    test("thead work", async () => {
      const wrapper = TableMount();
      expect(wrapper.find("thead").findAll('tr').length).toBe(4);

      await wrapper.setProps({ columns: makeColumnsData })
      expect(wrapper.find("thead").findAll('tr').length).toBe(3);
      let title = 'Street';
      expect(wrapper.find('thead').findAll('tr')[2].findAll('th')[0].find('.content').find('.title').text()).toBe(title);

    });

    test("pagination work", async () => {
      const wrapper = TableMount({props:{ data: makeData(20)}});

      expect(wrapper.find(".pagination").exists()).toBeTruthy();

      expect(wrapper.find(".pagination").findAll('.page-num').length).toBe(2);
      
      await wrapper.setProps({ data: makeData(30) })
      expect(wrapper.find(".pagination").findAll('.page-num').length).toBe(3);
      
    });
  });
});
