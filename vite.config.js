import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from "@rollup/plugin-inject";
import path from 'path';
export default defineConfig({
    base: 'muyun-web',
    build: {
        outDir: 'muyun', // 指定打包输出的目录名
    },
    server: {
        port: 9090,
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com/',  // 代理的目标地址
                changeOrigin: true,  // 是否更改请求源头为目标地址
                rewrite: (path) => path.replace(/^\/api/, ''),  // 重写路径，将 /api 去掉
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
        inject({
            _: 'lodash',  // 将 lodash 注入为全局的 `_`
            axios: 'axios',  // 将 axios 注入为全局的 `axios`
        }),
    ],
})
