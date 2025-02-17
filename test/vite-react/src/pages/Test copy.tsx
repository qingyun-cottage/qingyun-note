import { useState } from 'react'

// function Test() {
// }
// export default Test

const arrs = [
  { name: 'ruru', id: 1, hobby: '吃饭' },
  { name: 'fufu', id: 2, hobby: '睡觉' },
]

export default function Bio() {
  return (
    <>
      <div className="intro">
        <h1>欢迎来到我的站点！</h1>
      </div>
      <p className="summary">
        你可以在这里了解我的想法。
        <br />
        <b />
        还有科学家们的
        <i>
          照片<br></br>
        </i>
        ！
      </p>
    </>
  )
}
