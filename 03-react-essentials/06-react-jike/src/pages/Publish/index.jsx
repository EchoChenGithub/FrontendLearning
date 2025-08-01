import {Breadcrumb, Button, Card, Form, Input, Select} from "antd"
import styles from './index.module.scss'

const Publish = () => {
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
                            <Select.Option value={0}>推荐</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        lebel="封面："
                        name="type"
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
                    </Form.Item>
                    <Button className={styles.publishBtn} type="primary">发布文章</Button>
                </Form>
            </Card>

        </div>
    )
}

export default Publish