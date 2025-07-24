
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router'
import {RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

// 导入定制主题文件
import './theme.css'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
