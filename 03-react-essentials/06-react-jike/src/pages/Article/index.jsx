import {Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Table, Space, Tag} from "antd"
import styles from "./index.module.scss"
// 引入汉化包。让时间选择器显示中文
import dayjs from "dayjs"
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import {useChannel} from "@/hooks/useChannel.jsx";
import {deleteArticleAPI, getArticleListAPI} from "@/apis/article.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
dayjs.locale("zh_CN")

const {RangePicker} = DatePicker

const Article = () => {
    const {channelList} = useChannel()
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4,
    })
    const navigate = useNavigate();
    // 获取文章列表
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getArticleList = async () => {
            const res = await getArticleListAPI(reqData)
            setArticleList(res.data.results)
            setCount(res.data.total_count)
        }
        getArticleList()
    }, [reqData])

    // 点击确认删除文章
    const onConfirm = async (data) => {
        await deleteArticleAPI(data.id)
        // 更新文章列表
        setReqData({
            ...reqData
        })
    }

    // 定义状态枚举
    const status = {
        1: <Tag color='warning'> 待审核 </Tag>,
        2: <Tag color='success'> 审核通过 </Tag>,
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0]} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            // data - 后端返回的状态status 根据它做条件渲染
            // data === 1 => 待审核
            // data === 2 => 审核通过
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗?"
                            onConfirm={() => onConfirm(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    // 筛选功能
    // 获取当前的表单数据
    const onFinish = (values) => {
        // console.log(values)
        setReqData({
            ...reqData,
            channel_id: values.channel_id,
            begin_pubdate: values.date[0].format('YYYY-MM-DD'),
            end_pubdate: values.date[1].format('YYYY-MM-DD'),
            status: values.status,
        })
    }

    return (
        <div>
            <Card
                title={
                <Breadcrumb
                items={[
                    {
                        title: '首页',
                        href: '/',
                    },
                    {
                        title: '文章列表',
                    }
                ]}
                />}
                className={styles.articleCard}
            >
                <Form
                    initialValues={{status:'',channel_id:'',begin_pubdate:'',end_pubdate:''}}
                    onFinish={onFinish}
                    >
                    <Form.Item label="状态：" name="status">
                        <Radio.Group
                            options={[
                                {value: 0, label: '草稿'},
                                {value: 1, label: '待审核'},
                                {value: 2, label: '审核通过'},
                            ]}>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道：" name="channel_id">
                        <Select placeholder="请选择频道列表" defaultValue="Lucy" style={{width:120}}>
                            {channelList.map(item =><Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期：" name="date">
                        <RangePicker></RangePicker>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">筛选</Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*表格区域*/}
            <Card title={`根据筛选条件共查询到${count}条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} pagination={
                    {
                        total: count,
                        current: reqData.page,
                        pageSize: reqData.per_page,
                        onChange: (page) => {
                            setReqData({
                                ...reqData,
                                page,
                            })
                        }
                    }
                }></Table>
            </Card>
        </div>
    )
}
export default Article
