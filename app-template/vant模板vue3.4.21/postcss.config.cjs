// postcss.config.cjs

const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
    plugins: [
        autoprefixer(),
        pxtorem({
            rootValue({ file }) {
                // 设计稿宽度 375px 如果是750就写75
                return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 37.5
            },
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['.ignore', 'keep-px'],
            minPixelValue: 1,
            mediaQuery: false,
        }),
        // 设置 375px viewport --经测试上面的配置已足够
    ],
}
