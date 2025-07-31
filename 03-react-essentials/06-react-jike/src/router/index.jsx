// 用 react-router-dom 的 createBrowserRouter创建路由实例
import {createBrowserRouter, Navigate} from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login"
import {getLocalToken} from "@/utils/index.jsx";

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
        )
    },
    {
        path: "/login",
        element: <Login />
    }
])
 export default router


