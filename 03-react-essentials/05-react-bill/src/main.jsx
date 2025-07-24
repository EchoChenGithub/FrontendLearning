
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/main.jsx'
import {RouterProvider} from 'react-router-dom'
// 导入定制主题文件
import './theme.css'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
