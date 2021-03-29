import { join } from 'path'
import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import styleImport from 'vite-plugin-style-import'

const isProd = process.env.NODE_ENV === 'production'
const PROXY_UAPI = 'http://10.255.0.213:30578'
const PROXY_OAPI = 'http://10.255.0.213:30358'

export default (): UserConfigExport => {
  return {
    // 1. If you are using the ant-design series, you need to configure this
    // 2. Make sure less is installed in the dependency `yarn add less -D`
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            },
          },
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`
            },
          },
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style/index`
            },
          },
          {
            libraryName: 'element-plus',
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: join(__dirname, 'src'),
        },
      ],
    },
    server: {
      open: true,
      proxy: {
        ///uapi和/oapi是直播相关
        '/uapi': {
          target: PROXY_UAPI,
          changeOrigin: true,

          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/oapi': {
          target: PROXY_OAPI,
          changeOrigin: true,

          rewrite: (path) => path.replace(/^\/oapi/, ''),
        },
        '^/user': {
          target: 'http://lol-user.aixuexi.com',
          ws: false,
          changeOrigin: true,
          logLevel: 'debug',

          rewrite: (path) => path.replace(/^\/user/, '/user'),
        },
        '^/lol/learning': {
          target: 'http://learningzx.aixuexi.com',
          ws: false,
          changeOrigin: true,
          logLevel: 'debug',

          rewrite: (path) => path.replace(/^\/lol\/learning/, '/lol/learning'),
        },
        '^/lol11': {
          // target: "http://fudao.aixuexi.com",
          target: 'http://lol-teacher-tool.aixuexi.com',
          // target: "http://yapi.aixuexi.com/mock/151",
          ws: false,
          changeOrigin: true,
          logLevel: 'debug',

          rewrite: (path) => path.replace(/^\/lol/, '/lol'),
        },
      },
    },
  }
}
