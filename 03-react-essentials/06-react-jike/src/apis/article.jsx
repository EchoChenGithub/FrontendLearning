// 封装和文章相关的接口函数

import {request} from '@/utils/request'

// 1. 获取频道列表
export function getChannelListAPI() {
    return request({
        url:"/channels",
        method:"GET",
    })
}

// 2. 提交文章列表
export function createArticleAPI (data) {
    console.log(data)
    return request({
        url:"/mp/articles?draft=false",
        method:"POST",
        data  // Body参数
    })
}

// 3. 获取文章列表
export function getArticleListAPI (params) {
    return request({
        url:"/mp/articles",
        method:"GET",
        params
    })
}

// 4. 删除文章
export function deleteArticleAPI (id) {
    return request({
        url:`/mp/articles/${id}`,
        method:"DELETE",
    })
}

// 5. 获取文章详情
export function getArticleByIdAPI (id) {
    return request({
        url:`/mp/articles/${id}`,
        method:"GET",
    })
}

// 6. 更新文章
export function updateArticleAPI (data) {
    console.log(data.id)
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method:"PUT",
        data
    })
}
