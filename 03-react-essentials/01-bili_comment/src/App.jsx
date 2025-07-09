import avatar from './assets/bozai.png'
import './App.scss'
import {useEffect, useRef, useState} from "react";
import PracticeZone from "./PracticeZone.jsx";
import _ from "lodash";
import classNames from "classnames";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import axios from "axios";

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

/**
 * 评论列表的渲染和操作assets
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]


function App() {
    // 1. 渲染评论列表
    // 1.1 使用useState维护list
    // const [commentList, setCommentList] = useState(_.orderBy(defaultList, ['like'], ['desc']))

    // 获取接口数据渲染
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        // 请求数据
        async function getList() {
            // axios请求数据
            const res = await axios.get('http://localhost:3004/list')
            setCommentList(res.data)
        }
        getList()
    }, [])


    // 2.删除功能
    const handleDel = (id) => {
        // 对commentList进行过滤
        setCommentList(commentList.filter((item) => item.rpid !== id))
    }

    // 3. tab切换高亮功能
    // 3.1 点击谁就把谁的type记录下来
    // 3.2 通过记录的type和每一项遍历时的type做匹配 控制激活类名的显示
    const [type, setType] = useState('hot')
    const handleTabChange = (type) => {
        setType(type)
        // 4. 排序功能
        // 4.1 对commentList进行排序
        if (type === 'hot') {
            // 4.2 最热 => 喜欢数量降序: lodash
            setCommentList(_.orderBy(commentList, ['like'], ['desc']))
        } else {
            // 根据创建时间排序
            setCommentList(_.orderBy(commentList, ['ctime'], ['desc']))
        }

    }

    // 4.点击发布评论
    const [content, setContent] = useState('')
    const inputRef = useRef(null)
    const handlePublish = () =>  {
        setCommentList([
                ...commentList,
                {
                    // 评论id
                    rpid: uuidv4(),  // 随机id
                    // 用户信息
                    user: {
                        uid: '13258165',
                        avatar: '',
                        uname: '周杰伦',
                    },
                    // 评论内容
                    content: content,
                    // 评论时间
                    ctime: dayjs(new Date()).format('MM-DD hh:mm'),  // 格式化 月-日 时:分
                    like: 88,
                },
        ])
        // 1. 清空内容：把控制input的value状态设置为空串
        setContent('')
        // 2. 重新聚焦 - 拿到input的dom元素，调用focus方法
        inputRef.current.focus()
    }


    return (
        <div className="app">
                {/* 导航 Tab */}
                <div className="reply-navigation">
                    <ul className="nav-bar">
                        <li className="nav-title">
                            <span className="nav-title-text">评论</span>
                            {/* 评论数量 */}
                            <span className="total-reply">{10}</span>
                        </li>
                        <li className="nav-sort">
                            {/* 高亮类名： active */}
                            {tabs.map((item) => (
                                <span
                                    key={item.type}
                                    onClick={() => handleTabChange(item.type)}
                                    className={classNames('nav-item', {active: type === item.type})}>
                                {item.text}
                            </span>
                            ))}
                        </li>
                    </ul>
                </div>

                <div className="reply-wrap">
                    {/* 发表评论 */}
                    <div className="box-normal">
                        {/* 当前用户头像 */}
                        <div className="reply-box-avatar">
                            <div className="bili-avatar">
                                <img className="bili-avatar-img" src={avatar} alt="用户头像" />
                            </div>
                        </div>
                        <div className="reply-box-wrap">
                            {/* 评论框 */}
                            <textarea
                                className="reply-box-textarea"
                                placeholder="发一条友善的评论"
                                ref={inputRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {/* 发布按钮 */}
                            <div className="reply-box-send">
                                <div className="send-text" onClick={handlePublish}>发布</div>
                            </div>
                        </div>
                    </div>
                    {/* 评论列表 */}
                    <div className="reply-list">
                        {/* 评论项 */}
                        {commentList.map(item => (
                            <div key={item.rpid} className="reply-item">
                                {/* 头像 */}
                                <div className="root-reply-avatar">
                                    <div className="bili-avatar">
                                        <img
                                            className="bili-avatar-img"
                                            alt=""
                                            src={item.user.avatar}
                                        />
                                    </div>
                                </div>

                                <div className="content-wrap">
                                    {/* 用户名 */}
                                    <div className="user-info">
                                        <div className="user-name">{item.user.name}</div>
                                    </div>
                                    {/* 评论内容 */}
                                    <div className="root-reply">
                                        <span className="reply-content">{item.content}</span>
                                        <div className="reply-info">
                                            {/* 评论时间 */}
                                            <span className="reply-time">{item.ctime}</span>
                                            {/* 评论数量 */}
                                            <span className="reply-time">点赞数:{item.like}</span>
                                            {/* 条件： user.id === item.user.id */}
                                            {user.uid === item.user.uid &&
                                                <span className="delete-btn" onClick={() => handleDel(item.rpid)}>
                                            删除
                                            </span>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 在这里渲染你的练习区 */}
                <PracticeZone />

            </div>
        )
    }

export default App
