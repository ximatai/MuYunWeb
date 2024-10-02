import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from "@rollup/plugin-inject";
import path from 'path';
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig({
    base: 'muyun-web',

    build: {
        outDir: 'muyun', // 指定打包输出的目录名
        rollupOptions: {
            output: {
                /*
                 * 定义打包后的结构
                 */
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: ({name}) => {
                    if (name && name.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                //拆包避免加载首页index体积过大
                manualChunks(id) {
                    if (id.includes('node_modules/lodash')) {
                        return 'lodash';
                    }
                    if (id.includes(path.resolve(__dirname, 'src/store/index.js'))) {
                        return 'vendor';
                    }

                },
            },
        }
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
        visualizer({
            filename: './rollup/stats.html', // 输出分析文件
            open: false,  // 打包完成后自动打开分析页面
        }),
    ],
})
