
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

// 定义三个简单页面
const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

// 定义一个 404页面组件，用于匹配所有未定义的路径
const NotFound = () => <h2>404 Not Found</h2>


function App() {
    return (
        <div>
        {/*    导航栏： 使用 link 组件进行页面跳转，避免浏览器刷新*/}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <hr/>
        {/*    Routes 组件是所有路由规则的容器*/}
        {/*    只有在 Routes 内部定义的 Route 规则才会生效*/}
            <Routes>
            {/*    Route 定义单个路由规则*/}
            {/*    url 属性定义 URL 路径*/}
            {/*    `element`属性定义该路径对应的 React 组件，当路径匹配时，该组件会被渲染*/}
                <Route path={"/"} element={<Home />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/contact"} element={<Contact />} />
                {/*    定义 404 路由规则，使用通配符 `*` 匹配所有未定义的路径*/}
                <Route path={"*"} element={<NotFound />}></Route>
            </Routes>

        </div>
    )
}

export default App
