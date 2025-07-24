// 组合子模块 导出 store 实例

import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billStore'

const store =configureStore({
    reducer: {
        bill: billReducer,
    }
})

export default store
