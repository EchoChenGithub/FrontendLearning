// 创建路由实例 绑定 path element

import { createBrowserRouter } from 'react-router-dom'
import Layout from "../pages/Layout/main.jsx";
import New from "../pages/New/main.jsx";
import Month from "../pages/Month/main.jsx";
import Year from "../pages/Year/main.jsx";


const router = createBrowserRouter ([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                path:'/month',
                element: <Month/>
            },
            {
                path:'/year',
                element: <Year/>
            }
        ]
    },
    {
        path:'/new',
        element: <New/>
    }
])
export default router;

