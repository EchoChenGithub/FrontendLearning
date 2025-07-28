import { useState } from 'react'
import './App.css'
import { Button } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          this is App
          <Button type="primary">Button</Button>
      </div>
  )
}

export default App
