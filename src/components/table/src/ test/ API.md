# Table 参数
| 参数        | 说明    |  类型  |  默认值  |  
| --------   | -----   | ----  | ----    |
| columns    | 表格列的配置描述，具体项见下表  | array |   []    |   
| data       | 数据数组        |   object[]   |   []    
| pagination | 分页器，参考配置项或 pagination文档，设为 false 时不展示和进行分页  |   object    | {}
# Table Events

| 事件名称        | 说明    |  回调参数  |
| --------   | -----:  | :----: |
| change        | 分页、排序、筛选变化时触发 |   Function(pagination, sorter)|


# Column

| 参数        | 说明    |  类型  |  默认值  | 
| --------   | -----   | ----  | ----    |
| title    | 列头显示文字  |   string    |   -
| key        |  data数据的对应key  |   string    | -
| align        | 设置列的对齐方式     |  left/right/center    |left
| isColResize        | 是否可拖动调整宽度，此时 width 必须是 number 类型      |   boolean    | -
| sorter        | 排序函数，本地排序使用一个函数(参考 Array.sort 的     `(order, a, b) => {})`，需要服务端排序可设为 true      |   Function/boolean    | -
| width        | 列宽度  |    string/number    | 60
| render| 生成复杂数据的渲染函数，参数分别为当前行的值，行索引，当前行数据，列数据 | Function({ content, index, row, column}) {}|left

# Pagination

| 参数        | 说明    |  类型  |   默认值|  
| --------   | -----  | ----|    ---   |  
| current        | 当前页数|   number    | -
| pageSize        | 每条页数|   number    | -
| pageSizeOptions | 指定每页可以显示多少条 |   string[]    | ['10','20','30','40']
| total | 数据总数      |   number    | 0



# Demo

```
<template>
     <BasicTable :columns="columns" :data="data" />
</template>

import { BasicTable }  from "@/components/table";
import type { ColumnsType } from "@/components/table";

<script lang="ts" setup>
    const data = [...Array(20)].map((item, i) => ({
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
            name: "小蛮"
          }
    }));

    const columns: ColumnsType[] = [
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
                            title: "Block",
                            children: [
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
                }
            ]
        },
        {
            title: "Company",
            children: [
                {
                    title: "Company Address",
                    key: "companyAddress",
                    width: 200,
                    isColResize: true,
                },
                {
                    title: "Company Name",
                    key: "companyName",
                },
            ]
        },
        {
            title: "userName",
            key: "user.name",
            width: 100,
            fixed: "right",
            isColResize: true,
        },
        {
            title: "Gender",
            key: "gender",
            width: 80,
            fixed: "right",
            isColResize: true,
        },
];


</script>

```