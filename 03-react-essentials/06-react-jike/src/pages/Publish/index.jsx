import {Breadcrumb, Button, Card, Form, Input, Select, Space} from "antd"
import styles from './index.module.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {getChannelListAPI} from "@/apis/article"
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
                        name="channel"
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
                        name="type"
                    >
                    </Form.Item>
                    <Form.Item
                        label="内容："
                        // name="content"
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