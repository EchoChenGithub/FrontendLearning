import './index.scss'
import {Button, Card, Form, Input, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux"
import {fetchLogin} from "@/store/modules/userStore.jsx"
import {useNavigate} from "react-router-dom"


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            // 触发异步 action fetchLogin
            await dispatch(fetchLogin(values))
            // 异步操作成功后，才执行以下逻辑
            // 1. 跳转到首页
            navigate('/')
            // 2. 提示登录成功
            message.success('登录成功')
        } catch (error) {
            console.error('登录失败（组件捕获）', error)
            message.error(error || '登录失败，请检查手机号和验证码！')
        }
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo}  alt=""/>
                {/*登录表单*/}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号格式'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '验证码不能为空'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login

