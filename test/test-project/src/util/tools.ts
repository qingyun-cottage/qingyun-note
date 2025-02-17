// 简易的金额计算工具,避免js的精度问题

const Amount = {
    // 将金额转换为整数
    toInteger(amount: number): number {
        return Math.round(amount * 100)
    },

    // 将整数转换为金额
    toAmount(integer: number): number {
        return integer / 100
    },

    // 将金额转换为字符串
    toString(amount: number): string {
        return amount.toFixed(2)
    },
}

// 总价计算
export const sumPrice = (list: { price: number; amount: number }[]): number => {
    const total = list.reduce((acc, cur) => {
        return acc + Amount.toInteger(cur.price) * cur.amount
    }, 0)
    return Amount.toAmount(total)
}
