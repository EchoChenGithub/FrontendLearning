// 测试token 是否成功注入
import {useEffect} from "react";

import {request} from "@/utils/request.jsx";

const Layout = () => {
    useEffect(() => {
        request.get('/user/profile')
    })
    return (
        <div>this is Layout</div>
    )
}

export default Layout


