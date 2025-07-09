import {createContext, useContext, useEffect, useRef, useState} from "react";


// 受控表单绑定
// 1. 声明一个react状态useState
// 2. 核心绑定流程：通过value属性绑定react状态；绑定onChange事件，通过事件参数e拿到输入框最新的值，反向修改到react状态
function ControlledForm() {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  return (
      <div>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} />
      </div>
  )
}


// 从React中获取DOM元素
//1.useRef生成一个ref对象
//2.通过ref属性绑定到DOM元素上
//3.通过ref.current获取DOM元素
//渲染完毕之后dom生成之后才可用
function GetDom() {
  const inputRef = useRef(null)

  const showDom = () => {
    console.dir(inputRef.current)
  }

  return (
      <div>
        <input
            type="text"
            ref={inputRef}
        />
        <button
        onClick={showDom}
        >获取dom</button>
      </div>
  )
}


// 组件通信：
// 组件通信 1：子传父，在子组件中调用父组件的函数并传递实参
function Son({onGetMsg}) {
    // props是一个对象，里面包含了父组件传递过来的所有数据
    const sonMsg = 'Son message is coming'
    return (
        <div>
            this is Son,
            <button
                onClick={() => onGetMsg(sonMsg)}
            >
                给父组件传递消息
            </button>
        </div>
    )
}
// 组件通信 2：兄弟通信
function A({onGetAName}) {
    // Son组件中的数据
    const name = "A's name"
    return (
        <div>
            this is A component,
            <button onClick={()=>onGetAName(name)}>给 B 发送信息</button>
        </div>
    )
}
function B({name}) {
    return (
        <div>
            this is B component,
            A's name is {name}.
        </div>
    )
}
// 组件通信 3：跨层通信 App -> C -> D
// 使用 context 机制跨层级组件通信
// 1. 使用 createContext 方法创建一个上下文对象 Ctx
// 2. 在顶层组件中通过 Ctx.Provider 组件提供数据
// 3. 在底层组件中通过 useContext 钩子函数获取消费数据
const MsgContext = createContext()
function C() {
    return (
        <div>
            this is middle component,
            <D />
        </div>
    )
}
function D() {
    const topMsg = useContext(MsgContext)
    return (
        <div>
            this is bottom component, {topMsg}
        </div>
    )
}


// useEffect练习
const URL = 'https://geek.itheima.net/v1_0/channels'


// -----------------------------------------------------------------------------------------
// 主练习区组件，用来组合所有的小练习
export default function PracticeZone() {
  // 父子通信：把父组件的数据传给子组件。1. 父组件传递数据-在子组件标签上绑定属性；2，子组件接收数据，子组件通过 props 参数接收数据。
  // const name = 'this is father component name'
  const [msg, setMsg] = useState("")
  const [name, setName] = useState('')
  const getMsg = (msg) => {
    setMsg(msg)
  }
  const getAName = (name) => {
    setName(name)
  }
  // 1. 为跨层通信创建一个新的 state
  const [contextMsg, setContextMsg] = useState('默认消息')
  // 2. 创建一个点击事件处理函数，用来更新 contextMsg
  const handleContextBtnClick = () => {
      setContextMsg('来自顶层按钮的新消息！' + Math.random())
  }

  // useEffect 练习
  useEffect(() => {
      // 额外的操作，获取频道列表
  }, [])

  return (
      <div style={{ padding: '20px', border: '2-px solid red', margin: '20px' }}>
        <h1>--- 我的React练习区 ---</h1>
        <hr />
        <h2>--- 受控表单 ---</h2>
        <ControlledForm />
        <hr />
        <h2>--- 从React获取DOM元素 ---</h2>
        <GetDom />
        <hr />
        <h2>--- 组件通信 ---</h2>
        <h3>子传父</h3>
        <div>
            this is father component, {msg}
            <Son onGetMsg={getMsg} />
        </div>
        <h3>兄弟通信</h3>
        <div>
            this is father PracticeZone
            <A onGetAName={getAName} />
            <B name={name} />
        </div>
        <h3>跨层通信</h3>
        <div>
          <MsgContext.Provider value={contextMsg}>
              this is top component,
              <button onClick={()=>{handleContextBtnClick(contextMsg)}}>给bottom 发送信息</button>
              <C />
          </MsgContext.Provider>
        </div>

      </div>
  );
}

