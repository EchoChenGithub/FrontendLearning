import {configureStore} from '@reduxjs/toolkit'
//引入子模块 reducer
import counterReducer from './modules/counterStore'

const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})

export default store