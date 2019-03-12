import request from '@/utils/request'

const baseURL = process.env.BASE_API

export function login(data) {
  return request({
    url: baseURL + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: baseURL + '/user/article',
    method: 'get'/* ,
    params: { token } */
  })
}

export function logout() {
  return request({
    url: baseURL + '/user/article',
    method: 'get'
  })
}
