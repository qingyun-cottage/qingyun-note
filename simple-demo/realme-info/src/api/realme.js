import request from '../utils/request'

export const getAll = () => {
    return request({
        url: '/api/market/model/get?language=2052',
        method: 'get',
    })
}

export const getListByType = category => {
    return request({
        url: '/api/market/model/like/get',
        method: 'get',
        params: {
            siteCode: 'cn',
            category,
        },
    })
}

/**
 * 获取产品详情
 * @param {string} marketModelName 产品名称
 * @param {string} productCategory 产品类型
 * @returns
 */
export const getDetail = (marketModelName, productCategory) => {
    return request({
        url: '/api/parts/price/list',
        method: 'post',
        data: {
            countryName: 'CN',
            language: '2052',
            marketModelName,
            productCategory,
        },
    })
}
