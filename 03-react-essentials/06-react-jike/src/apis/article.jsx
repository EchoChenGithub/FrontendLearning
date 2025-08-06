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


