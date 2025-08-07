import {Breadcrumb, Button, Card, Form, Input, Select, Space, Radio, Upload, message} from "antd"
import styles from './index.module.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {createArticleAPI, getArticleByIdAPI, updateArticleAPI} from "@/apis/article"
import {useEffect, useState} from "react"
import {PlusOutlined} from "@ant-design/icons";
import {useChannel} from "@/hooks/useChannel.jsx"
import {useSearchParams} from "react-router-dom"

const Publish = () => {
    // 频道列表
    const {channelList} = useChannel()
    // 获取实例
    const [form] = Form.useForm()
    // 提交表单
    const onFinish = async (formValues) => {
        if (imageList.length !== currentImageType) {
            message.error('请上传指定数量的图片')
            return
        }
        const {title, content, channel_id} = formValues
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
            title,
            content,
            cover: {
                type: currentImageType,
                images: imageList.map((item) => {
                    if (item.response) {
                        return imageList.map(item => item.response.data.url)
                    } else {
                        return item.url
                    }
                })
            },
            channel_id
        }
        // 2. 调用接口提交
        if (articleId) {
            // 编辑文章
            await updateArticleAPI({...reqData, id: articleId})
        } else {
            // 发布文章
            await createArticleAPI(reqData)
        }
    }

    // 上传图片回调
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        setImageList(info.fileList)
    }

    // 切换图片封面类型
    // const [imageType, setImageType] = useState(0)
    // const onTypeChange = (e) => {
    //     setImageType(e.target.value)
    // }

    const currentImageType = Form.useWatch('type', form)

    // 回填数据
    const [searchParams, setSearchParams] = useSearchParams()
    const articleId = searchParams.get('id')  // 从当前的 URL 中获取 id 参数的值


    useEffect(() => {
        // 1. 通过 id 获取数据
        const getArticleDetail = async () => {
            const res = await getArticleByIdAPI(articleId)
            console.log(res.data)
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type,
            })
            setImageList(res.data.cover.images.map(item => ({url: item})))
        }
        // 只有有 id 的时候才调用函数
        if (articleId) {
            getArticleDetail()
        }
        }, [articleId, form])


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
                            title: articleId ? '编辑文章' : '发布文章',
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
                    form={form}
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
                    <Form.Item label="封面：">
                        <Form.Item name="type">
                            <Radio.Group
                                         options={[
                                             {value: 1, label: '单图'},
                                             {value: 3, label: '三图'},
                                             {value: 0, label: '无图'}
                                         ]}>
                            </Radio.Group>
                        </Form.Item>

                        {currentImageType > 0 && <Upload
                            name="image"  // 必须与接口里规定的参数同名
                            listType="picture-card"
                            className="image-uploader"
                            showUploadList
                            action="http://geek.itheima.net/v1_0/upload"  // 上传的接口
                            // beforeUpload={beforeUpload}
                            onChange={onUploadChange}
                            maxCount={currentImageType}
                            fileList={imageList}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined />
                            </div>
                        </Upload>}

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