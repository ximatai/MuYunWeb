import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from "@rollup/plugin-inject";
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_APP_ROOT || '/',

        build: {
            outDir: 'muyun', // 指定打包输出的目录名
            rollupOptions: {
                output: {
                    /*
                     * 定义打包后的结构
                     */
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: ({ name }) => {
                        if (name && name.endsWith('.css')) {
                            return 'css/[name]-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                    // 拆包避免加载首页 index 体积过大
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
                include: ['**/*.js', '**/*.ts', '**/*.vue'], // 限制插件只在 JS、TS、Vue 文件中生效
            }),
            visualizer({
                filename: './rollup/stats.html', // 输出分析文件
                open: false,  // 打包完成后自动打开分析页面
            }),
        ],
    };
});
