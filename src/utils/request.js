import {ElMessage} from 'element-plus'
import axios from 'axios'
import qs from 'qs'
import {isCompleteUrl} from '../utils/tools'
import {Base64} from 'js-base64';

// 一般错误提示
const commonErrorMessage = _.throttle(() => {
    ElMessage.error('系统错误!')
}, 2500)

// 未登录跳转
const notLoginMessgae = _.throttle(() => {
    ElMessage.warning('登录超时!')
}, 2500)

// 接口代理
const apiProxyConfig = {}
const apiProxy = value => {
    let result = value
    if (_.startsWith(value, '/')) {
        result = result.substring(1)
    }
    const prefix = _.split(result, '/')[0]
    if (apiProxyConfig[prefix]) {
        return '/' + apiProxyConfig[prefix] + result.substring(prefix.length)
    }
    return value
}

// 增加请求类型阻止gateway自动302跳转
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
    timeout: 3 * 60 * 1000,
    validateStatus: status => {
        return (status >= 200 && status < 300) || status == 401
    },
    paramsSerializer: params => {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    }
})

service.interceptors.request.use(
    config => {
        const PREFIX = 'muyun';
        //base64转换condition参数
        if ((config.url.substring(config.url.length - 10) == '/reference' || config.url.substring(config.url.length - 5)) == '/view' && typeof config.params != 'undefined' && typeof config.params.condition != 'undefined' && config.params.condition.charAt(config.params.condition.length - 1) != '=') {
            typeof lr != null ? config.params.condition = PREFIX + Base64.encode(config.params.condition) + '=' : config.params.condition = Base64.encode(config.params.condition) + '='
            config.params.condition = config.params.condition.split("").reverse().join("") + '@';
        }
        if ((config.url.substring(config.url.length - 10) == '/reference' || config.url.substring(config.url.length - 5)) == '/view' && typeof config.data != 'undefined' && typeof config.data.condition != 'undefined' && config.data.condition.charAt(config.data.condition.length - 1) != '=') {
            typeof lr != null ? config.data.condition = PREFIX + Base64.encode(config.data.condition) + '=' : config.data.condition = Base64.encode(config.data.condition) + '='
            config.data.condition = config.data.condition.split("").reverse().join("") + '@';
        }

        // 自动补全斜杠
        const base = '/'
        const url = config.url
        if (!isCompleteUrl(url)) {
            const endSlash = _.endsWith(base, '/')
            const startSlash = _.startsWith(url, '/')
            if (endSlash && startSlash) {
                config.url = base + url.substring(1)
            } else if (!endSlash && !startSlash) {
                config.url = base + '/' + url
            } else {
                config.url = base + url
            }
        }
        config.url = apiProxy(config.url)
        // 表单处理
        if (config.useFormData) {
            config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
            config.transformRequest = [data => {
                let result = ""
                Object.keys(data).forEach(v => {
                    result += `${v}=${data[v]}&`
                })
                return result.length > 0 ? result.substring(0, result.length - 1) : result
            }]
        }
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            const data = response.data
            // 有些response仅为表达处理成功的状态，而不提供任何有具体的data
            // 此时若抛出response.data会导致then代码段无法正常进入，故将response整体抛出
            return _.isNil(data) ? response : data
        } else if (response.status == 401) {
            // 401被视为身份未验证，通常将通过gateway跳转到登录页
            // 亦可通过配置阻止此行为
            response.config.noJump || notLoginMessgae()
        }
    },
    error => {
        if (error.response) {
            // 自定义错误响应
            const onerror = error.config.onerror
            if (onerror && _.isFunction(onerror)) {
                onerror(error.response)
            } else {
                const respData = error.response.data
                if (respData && _.isString(respData) && respData.length > 0) {
                    ElMessage.error(respData)
                } else if (respData && respData.message) {
                    ElMessage.error(respData.message)
                } else {
                    commonErrorMessage()
                }
            }
        } else {
            commonErrorMessage()
        }

        return Promise.reject(error)
    }
)


export default service

export const apiConvertor = apiProxy