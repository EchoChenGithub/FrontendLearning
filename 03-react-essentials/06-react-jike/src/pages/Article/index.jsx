import {Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Table} from "antd"
import styles from "./index.module.scss"
// 引入汉化包。让时间选择器显示中文
import dayjs from "dayjs"
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
dayjs.locale("zh_CN")

const {RangePicker} = DatePicker

const Article = () => {
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
                        <Select placeholder="Lucy" style={{width:100}}>
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
            <Card title={'根据筛选条件共查询到 count 条结果：'}>
                <Table rowKey="id" columns={columns} ></Table>
            </Card>
        </div>
    )
}
export default Article
