// 测试token 是否成功注入
import {useEffect} from "react"

import {request} from "@/utils/request.jsx"
import {Layout, Menu, Popconfirm} from "antd"
import styles from "./index.module.scss"
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo, setToken} from "@/store/modules/userStore.jsx";
import {removeLocalToken} from "@/utils/index.jsx";

const { Header, Content, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]


const GeekLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        request.get('/user/profile')
    })

    // 根据路由路径反向高亮
    //1.获取当前路由路径 useLocation().pathname
    const location = useLocation()
    const pathname = location.pathname

    // 触发用户个人信息 action
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    // 从 store 中获取用户信息
    const userName = useSelector(state => state.user.userInfo.name)

    const onLogoutConfirm = () => {
        // 1. 清空 token
        dispatch(clearUserInfo())
        // 2. 跳转到登录页
        navigate('/login')
    };
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.logo} />
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{userName}</span>
                    <span className={styles.userLogout}>
                        <Popconfirm
                            title="确认退出吗？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={onLogoutConfirm}>
                            <LogoutOutlined />
                            <span>退出</span>
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider className={styles.layoutSider}>
                    <Menu className={styles.siderMenu}
                          mode="inline"
                          theme="dark"
                          selectedKeys={[pathname]}
                          items={items}
                          onClick={(item)=>{
                              navigate(item.key)
                          }}
                    />
                </Sider>
                <Content className={styles.layoutContent}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default GeekLayout


