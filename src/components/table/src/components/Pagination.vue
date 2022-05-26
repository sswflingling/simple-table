<template>
    <div class="pagination-box">
        <div class="pagination-select">
            <select @change="pageSizeChange">
                <option v-for="item in pageSizes"
                        :value="item"
                        :key="item"
                        :selected="item === pageSize">
                    {{ item }} 条/页    
                </option>
            </select>
        </div>
        <ul class="page-list">
            <li @click="setPage(-1)">
               《
            </li>
            <li v-for="num in pageNum" 
                :key="num"
                class="page-num"
                :class="{'active': currentPage === num}"
                @click="setPage(num, true)">
                {{ num }}
            </li>
            <li @click="setPage(1)">
                》
            </li>
        </ul>
        <div class="quick-jumper">
            跳至<input type="text" v-model="jumper" @keyup.enter="toJumper" />页
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed} from "vue"

    const props = defineProps({
        // 当前页
        currentPage: {
            type: Number,
            default: 0
        },
        //一页显示的个数
        pageSize: {
            type: Number,
            default: 10
        },
        // 每页显示个数选择器的选项设置
        pageSizes: {
            type: Array,
            default: [10,20,30,40]
        },
        //总条数
        total: {
            type: Number,
            default: 0
        }
    })

    const emit = defineEmits(["update:currentPage", "update:pageSize"]);
    const jumper = ref(""); //跳转至
    const pageNum = computed(()=> Math.ceil(props.total/props.pageSize))

    // 跳转
    function setPage(num: number, isPage = false) {
        emit("update:currentPage", interval(isPage ? num : props.currentPage + num));
    }
    // 跳转
    function toJumper() {
        const value = parseInt(jumper.value);
        if (!value && value != 0) {
            jumper.value = "";
            return;
        }
        emit("update:currentPage", interval(value));
        jumper.value = "";
    }

    // 切换一页显示个数
    function pageSizeChange(e: any) {
        const value = e.target?.value;
        if (!value) return value;
        emit("update:pageSize", parseInt(value));
        emit("update:currentPage", 1); 
    }

    function interval(num: number) {
        return num < 1 ? 1 : num > pageNum.value ? pageNum.value : num;
    }

</script>
<style>
    ul,li {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    a {
        text-decoration: none;
        color: #000;
    }
</style>
<style lang="less" scoped>
    .pagination-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
        .pagination-select {
            select {
                padding-left: 2px;
                min-width: 90px;
                height: 24px;
                border-radius: 3px;
                border: 1px solid #d9d9d9;

                &:focus {
                    border-color: #40a9ff;
                    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                    border-right-width: 1px !important;
                    outline: 0;
                }
            }
        }
    }
    .page-list {
        display: flex;
        align-items: center;
        li {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 22px;
            height: 28px;
            padding: 0 4px;
            margin: 0 5px;
            border-radius: 2px;
            cursor: pointer;
        }
        .page-num {
            color: #606266;
        }
        .active {
            color: #fff;
            background: #409eff;
        }
    }
    .quick-jumper {
        margin-left: 15px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        input {
            margin: 0 2px;
            width: 28px;
            padding: 0 6px;
            color: #000000d9;
            border-radius: 3px;
            font-size: 14px;
            line-height: 1.5715;
            background-color: #fff;
            background-image: none;
            border: 1px solid #d9d9d9;
            transition: all 250ms;
            &:focus {
                border-color: #40a9ff;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                border-right-width: 1px !important;
                outline: 0;
            }
        }
    }
</style>
