// 放置和用户相关的所有请求

// 1. 登录请求
import {request} from "@/utils";

export function loginAPI(formData) {
    return request({
        url:"/authorizations",
        method:"POST",
        data: formData,
    })
}

// 2. 获取用户信息
export function getProfileAPI(formData) {
    return request({
        url:"/user/profile",
        method:"GET",
    })
}