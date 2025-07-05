import {useRef, useState} from "react";


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

// 主练习区组件，用来组合所有的小练习
export default function PracticeZone() {
  return (
      <div style={{ padding: '20px', border: '2-px solid red', margin: '20px' }}>
        <h1>--- 我的React练习区 ---</h1>
        <hr />
        <h2>--- 受控表单 ---</h2>
        <ControlledForm />
        <hr />
        <h2>--- 从React获取DOM元素 ---</h2>
        <GetDom />
      </div>
  );
}

