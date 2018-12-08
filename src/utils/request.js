import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
// import {getToken} from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 15000//请求超时时间
})


service.interceptors.request.use(config => {
    // if (store.getters.token) {
        // config.headers['Content-Type'] = 'application/json'// 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
}, error => {
      console.log('err' + error)// for debug
      MessageBox.confirm('未知异常', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    console.log(response.data)
      const res = response.data
      if (res.code !== 200) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        if (res.code === 400 || res.code === 500 ) {
          MessageBox.confirm(res.message, '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
        }
        return Promise.reject('error')
      } else {
      // console.log(response.data)
        return res
      }
    },
    error => {
       if(error.response.data.message  === '请求过于频繁') {
          Message({
            message: '请求过于频繁',
            type: 'warning',
            duration:  1000
          })
          return Promise.reject(error.response.data.message);
        } else if(error.response.data.message  === '无权限') {
          Message({
            message: '无权限',
            type: 'warning',
            duration:  1000
          })
          return Promise.reject(error.response.data.message);
        } else {
          MessageBox.confirm('登录超时', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
        }
      return Promise.reject(error);
    }
  )
  
export default service

