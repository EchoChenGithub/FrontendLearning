
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import Login from "../pages/Login/main.jsx";
import Article from "../pages/Article/main.jsx";
import Board from "../pages/Board/main.jsx";
import Layout from "../pages/Layout/main.jsx";
import About from "../pages/About/main.jsx";
import NotFound from "../pages/NotFound/main.jsx";

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // 设置为默认二级路由
            {
                index: true,
                element: <Board/>,
            },
            {
                path:'about',
                element: <About/>,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article/:id/:name',
        element: <Article />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router

