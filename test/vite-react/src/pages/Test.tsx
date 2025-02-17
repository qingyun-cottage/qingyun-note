import { useState } from 'react'

// function Test() {
// }
// export default Test

const arrs = [
  { name: 'ruru', id: 1, hobby: '吃饭' },
  { name: 'fufu', id: 2, hobby: '睡觉' },
]

// export default function Test() {
//   const [count, setCount] = useState(0)

//   // return (
//   //   <div>
//   //     <p>You clicked {count} times</p>
//   //     <button onClick={() => setCount(count + 1)}>Click me</button>
//   //   </div>
//   // )

//   const listItems = arrs.map(arr => (
//     <li key={arr.id}>
//       {arr.name}-{arr.hobby}
//     </li>
//   ))
//   return <ul>{listItems}</ul>

 
// }

let a = 0

function AButton({ message, children }) {
  a++
  console.log(a,' 什么', message, children)
  function handleClick() {
      // 模板字符串
      alert(`目前弹出的消息是${message}`)
  }

  return (
      <div onClick={() => alert('我是button的父元素')}>
          <button onClick={handleClick}>
              {children}
          </button>
      </div>
  )

}

export default function ToolBar() {
  return (
      <>
          <AButton message="我被点击了去问问他！">点击我</AButton>
          <br />
          <AButton message="你被点击了！">点击你</AButton>
      </>
  )
}