import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        // host: '0.0.0.0',
        host: '0.0.0.0',

        proxy: {
            '/api': {
                target: 'https://customer-api.realme.com/cn/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
                // 需要把Origin 替换为 https://www.realme.com
                headers: {
                    Origin: 'https://www.realme.com',
                },
            },
        },
    },
})
