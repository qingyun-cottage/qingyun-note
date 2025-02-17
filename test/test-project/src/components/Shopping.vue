<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { sumPrice } from '../util/tools'

type ShopItem = { id: number; name: string; price: number; imgUrl?: string }

type CarItem = { id: number; count: number }

const shopList = reactive<ShopItem[]>([
    {
        id: 1,
        name: '苹果',
        price: 10.99,
    },
    {
        id: 2,
        name: '香蕉',
        price: 20.99,
    },
    {
        id: 3,
        name: '菠萝-广西香蕉新鲜包熟背包',
        price: 10.99,
    },
    {
        id: 4,
        name: '橘子',
        price: 8.88,
    },
    {
        id: 5,
        name: '榴莲',
        price: 200,
    },
])

const carList = reactive<CarItem[]>([])

const showCar = ref(false)
// 切换购物车显示
const handleMouseEnter = () => {
    showCar.value = true
}
const handleMouseLeave = () => {
    showCar.value = false
}

const addCar = (item: ShopItem) => {
    console.log('addCar', item)

    if (carList.length === 0) {
        carList.push({
            id: item.id,
            count: 1,
        })
    } else {
        const index = carList.findIndex(carItem => carItem.id === item.id)
        if (index === -1) {
            carList.push({
                id: item.id,
                count: 1,
            })
        } else {
            carList[index].count += 1
        }
    }
}

const deleteCarItem = (item: CarItem) => {
    const index = carList.findIndex(carItem => carItem.id === item.id)
    if (index !== -1) {
        carList.splice(index, 1)
    }
}

const alertInfo = (allPrice: number) => {
    alert(`商品总价为${allPrice}`)
}

const carInfo = computed(() => {
    const shops = carList.map(carItem => {
        const shopItem = shopList.find(item => item.id === carItem.id)
        if (shopItem) {
            return {
                ...carItem,
                name: shopItem.name,
                price: shopItem.price,
            }
        } else {
            return {
                ...carItem,
                name: '商品已下架',
                type: -1,
                price: 0,
            }
        }
    })

    const allPrice = sumPrice(
        shops.map(item => ({ price: item.price, amount: item.count }))
    )

    return {
        shops,
        allPrice,
    }
})
</script>

<template>
    <div class="head">
        <h1>购物天堂</h1>
        <div class="car_box" @mouseleave="handleMouseLeave">
            <button @mouseenter="handleMouseEnter">购物车</button>
            <div class="toast" v-show="showCar">
                <div class="shops">
                    <h3 v-if="carList.length === 0">暂无商品去添加</h3>
                    <template v-else>
                        <div
                            class="shop_info"
                            v-for="carItem in carInfo.shops"
                            :key="carItem.id"
                        >
                            <span class="shop_name">{{ carItem.name }}</span>
                            <span>{{ carItem.price }}*{{ carItem.count }}</span>
                            <button @click="deleteCarItem(carItem)">
                                删除
                            </button>
                        </div>
                    </template>
                </div>
                <button class="buy" @click="alertInfo(carInfo.allPrice)">
                    购买
                </button>
            </div>
        </div>
    </div>
    <div class="shop_list">
        <div class="card" v-for="item in shopList" :key="item.name">
            <div class="img_box">
                <img :src="item.imgUrl" alt="加载失败" />
            </div>
            <div class="shop_info">
                <span class="shop_name">{{ item.name }}</span>
                <span>{{ item.price }}</span>
                <button @click="addCar(item)">加入购物车</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .car_box {
        position: relative;
        .toast {
            width: 210px;
            padding: 8px;
            background: #fff;
            position: absolute;
            top: 100%;
            right: 0;
            border: 1px solid #ccc;

            .buy {
                width: 100%;
                margin-top: 8px;
            }
        }
    }
}

.shop_list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .card {
        box-sizing: border-box;
        width: calc((100% - 16px) / 3);
        border: 1px solid #ccc;
        padding: 8px;

        .img_box {
            background: #ddd;
            aspect-ratio: 1 / 1;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

.shop_info {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    align-items: center;

    .shop_name {
        /* 霸占剩余空间 */
        flex: 1;
        /* 溢出显示... */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
