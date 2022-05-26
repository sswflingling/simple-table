import type { ColumnsType } from "@/components/table";

import { h } from "vue"

export const columns: ColumnsType[] = [
    {
        title: "ID",
        key: "key",
        width: 100
    },
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

export const data = [...Array(100)].map((item, i) => ({
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