// 用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import {addLocalToken, getLocalToken, request} from "@/utils"

const userStore = createSlice({
    name: "user",
    initialState: {
        token: getLocalToken() || '',
        userInfo: {}
    },
    reducers: {
        // 修改方法
        setToken: (state, action) => {
            state.token = action.payload
            // 再存一份到本地 LocalStorage (这样写违反了 reducer 必须是纯函数，而读写浏览器本地存储是一种副作用)
            // localStorage.setItem('token_key', action.payload)
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }

})

// 解构 actionCreator
const { setToken, setUserInfo } = userStore.actions;

// 获取 reducer 函数
const userReducer = userStore.reducer;

// 异步方法 完成登录获取 token
const fetchLogin = (loginForm) => {
    // 返回一个函数
    return async (dispatch) => {
        // 1. 发送异步请求
        const res = await request.post("/authorizations", loginForm)
        // 2. 提交同步 action 进行 token 的存入
        dispatch(setToken(res.data.token))
        // 3. 把 token 存入 localStorage
        addLocalToken(res.data.token)
    }
}
// 获取用户信息的异步方法
const  fetchUserInfo = () => {
    // 返回一个函数
    return async (dispatch) => {
        // 1. 发送异步请求
        const res = await request.get("/user/profile")
        // 2. 提交同步 action 进行用户信息的存入
        dispatch(setUserInfo(res.data))
    }
}


export { fetchLogin, setToken, fetchUserInfo }

export default userReducer;