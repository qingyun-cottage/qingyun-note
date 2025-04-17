<script setup>
import { onMounted, reactive } from 'vue'
import { getAll, getListByType, getDetail } from './api/realme'

const state = reactive({
    typeList: [],
    currentType: '',
    currentList: [],
})

onMounted(() => {
    console.log('mounted')
    getAllProduct()
})

const getAllProduct = () => {
    getAll().then(res => {
        console.log(res)
        // res是一个数组，里面有每个产品的信息
        // 根据每个item的productCategory 去重
        const productCategorySet = new Set(
            res.map(item => item.productCategory)
        )
        console.log(productCategorySet)
        state.typeList = [...productCategorySet]
    })
}

// 切换类型
const changeType = type => {
    if (state.currentType === type) {
        return
    }
    state.currentType = type
    getListByType(type).then(res => {
        console.log(res)
        state.currentList = res
        getListDetail()
    })
}

// 获取列表详情
const getListDetail = async () => {
    for (let i = 0; i < state.currentList.length; i++) {
        const item = state.currentList[i]
        const res = await getDetail(item.marketModelName, item.productCategory)
        console.log(res)
        item.detail = res
    }
}

// getDetail('真我 65W 超级闪充电源适配器套装', '生活周边类')
</script>

<template>
    <div class="page">
        <div class="type_list">
            <div
                class="type_item"
                v-for="item in state.typeList"
                :key="item"
                @click="changeType(item)"
                :class="{ active: state.currentType === item }"
            >
                {{ item }}
            </div>
        </div>
        <hr />
        <!-- 产品列表 -->
        <div class="product_list">
            <div
                class="product_item"
                v-for="item in state.currentList"
                :key="item.marketModelName"
            >
                <div class="product_name">{{ item.marketModelName }}</div>
                <span v-if="!item.detail || item.detail.length == 0"
                    >正在查询/没有查询到信息</span
                >
                <table
                    class="result-table"
                    cellspacing="0"
                    style="display: table"
                    v-else
                >
                    <tbody>
                        <tr class="table-th table-row">
                            <td class="table-td table-cell">备件名称</td>
                            <td class="table-td table-cell right">
                                保外指导价
                            </td>
                        </tr>
                        <tr class="table-row" v-for="detail in item.detail">
                            <td
                                class="table-cell"
                                :class="{
                                    super:
                                        detail.materialSubCategory == '屏幕' &&
                                        ((detail.activePrice || 999) < 300 ||
                                            detail.userPrice < 300),
                                }"
                            >
                                {{ detail.materialSubCategory }}
                                <template v-if="detail.ram">
                                    ({{ detail.ram }}+{{ detail.rom }})
                                </template>
                                <span class="tag" v-if="detail.activePrice"
                                    >限时优惠</span
                                >
                            </td>
                            <td class="table-cell right">
                                <template v-if="detail.activePrice">
                                    <span class="activePrice">{{
                                        detail.activePrice
                                    }}</span>
                                    <span class="originPrice">{{
                                        detail.userPrice
                                    }}</span>
                                </template>
                                <template v-else>
                                    {{ detail.userPrice }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;

    hr {
        margin: 10px 0;
    }
}

.type_list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .type_item {
        padding: 10px;
        border: 1px solid #aaa;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;

        &.active {
            background-color: #333;
        }
    }
}

.product_list {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* flex-grow: 0; */
    align-content: flex-start;

    .product_item {
        min-width: 520px;
        min-height: 200px;
    }
    .product_name {
        margin-top: 20px;
        font-size: 24px;
    }

    .table-cell.right {
        width: 200px;
    }

    .table-cell.super {
        background: #f003;
    }

    .table-cell {
        font-size: 16px;
        padding-left: 16px;
        width: 300px;
        line-height: 32px;
        border: 0.5px solid #e2e2e2;
        text-align: start;

        .tag {
            margin-left: 6px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            display: inline-block;
            min-width: 36px;
            border-radius: 0.04rem;
            background: #887022;
            padding: 1px 4px;
        }

        .activePrice {
            color: #f03f54;
            display: inline-block;
            margin-right: 12px;
        }

        .originPrice {
            color: #999;
            text-decoration: line-through;
        }
    }
}
</style>
