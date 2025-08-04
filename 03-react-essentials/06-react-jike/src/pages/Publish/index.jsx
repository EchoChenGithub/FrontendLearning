import {Breadcrumb, Button, Card, Form, Input, Select, Space} from "antd"
import styles from './index.module.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {createArticleAPI, getChannelListAPI} from "@/apis/article"
import {useEffect, useState} from "react"

const Publish = () => {
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelListAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    // 提交表单
    const onFinish = async (formValues) => {
        console.log(formValues)
        const {title, content, channel_id} = formValues
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
            title: '',
            content: '',
            cover: {
                type: 0,
                images: []
            },
            channel_id: ''
        }
        // 2. 调用接口提交
        createArticleAPI(reqData)
    }

    return (
        <div className={styles.publish}>
            <Card title={
                <Breadcrumb
                    items={[
                        {
                            title: '首页',
                            href: '/',
                        },
                        {
                            title: '发布文章',
                        }
                    ]}
                />
            }>
                <Form
                    className={styles.publishForm}
                    size="default"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题："
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入文章标题'
                            }
                        ]}
                    >
                        <Input placeholder="请输入文章标题" style={{width:400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道："
                        name="channel_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择文章频道'
                            }
                        ]}
                    >
                        <Select placeholder="请选择文章频道" style={{width:400}}>
                            {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="封面："
                        // name="type"
                    >
                    </Form.Item>
                    <Form.Item
                        label="内容："
                        name="content"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        {/*    富文本编辑器*/}
                        <ReactQuill className={styles.publishQuill} theme="snow" placeholder="请输入文章内容"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">发布文章</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish