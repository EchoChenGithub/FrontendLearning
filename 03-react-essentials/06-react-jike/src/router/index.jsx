// 用 react-router-dom 的 createBrowserRouter创建路由实例
import {createBrowserRouter, Navigate} from "react-router-dom"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import {getLocalToken} from "@/utils/index.jsx"
// import Home from "@/pages/Home/index.jsx"
// import Article from "@/pages/Article/index.jsx"
// import Publish from "@/pages/Publish/index.jsx"
import {lazy, Suspense} from "react"


// 1. lazy 函数对组件进行动态导入
const Home = lazy(() => import("@/pages/Home/index.jsx"))
const Article = lazy(() => import("@/pages/Article/index.jsx"))
const Publish = lazy(() => import("@/pages/Publish/index.jsx"))


// 定义 AuthGuard 函数：如果有 token，返回路由组件，如果没有则返回登录页面
function AuthGuard({children}){
    const token = getLocalToken()
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children
}


const router = createBrowserRouter([
    {
        path: "/",
        // 受保护的路由组件Layout
        element:(
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children:[
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>loading...</div>}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: "/publish",
                element:(
                    <Suspense fallback={<div>loading...</div>}>
                        <Publish />
                    </Suspense>
                )
            },
            {
                path: "/article",
                element:(
                    <Suspense fallback={<div>loading...</div>}>
                        <Article />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])
 export default router


