import './index.scss'
import {Button, Card, Form, Input} from 'antd'
import logo from '@/assets/logo.png'


const Login = () => {
    const onFinish = (values) => {
        console.log(values)
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