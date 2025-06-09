import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                // manualChunks(id) {
                //     if (id.includes('node_modules')) {
                //         return 'vendor' // 将所有 node_modules 中的依赖打包到 vendor.js
                //     }
                //     if (id.includes('vant')) {
                //         return 'vant' // 特别为 Vant 组件库创建一个单独的块
                //     }
                //     if (id.includes('vue')) {
                //         return 'vue'
                //     }
                // },
                // manualChunks: {
                //     vender: ['vue'],
                // },

                format: 'iife',
            },
            // 其他 Rollup 选项...
        },
    },
})
