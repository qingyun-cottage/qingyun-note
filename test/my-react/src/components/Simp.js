import { useEffect, useState } from 'react'
import useMyState from '../utils/useMyState'

let i = 0

function List({ children, test }) {
    const [obj, setObj, mySetObj] = useMyState({
        name: '张三',
        age: 12,
        sex: '男',
        address: '北京',
        hobby: '打篮球',
    })

    const [num_test, setNum_test, mySetNum_test] = useMyState(0)

    function setSth(e, something) {
        console.log('setSth', e, something)
        console.log('i', i)
        if (i++ === 0) {
            // 更改 姓名 为 李四 , 年龄为 18
            mySetObj({
                name: '李四',
                age: 18,
            })
        } else {
            mySetObj({
                sex: '女',
                address: '上海',
            })
        }
    }

    function add() {
        setNum_test(num_test => num_test + 1)
        // mySetNum_test({ a: 1 })
    }

    return (
        <>
            <h1 onClick={e => setSth(e, '123')}>{test}</h1>
            <h1 onClick={add}>{num_test}</h1>
            <div>
                <div>{obj.name}</div>
                <div>{obj.age}</div>
                <div>{obj.sex}</div>
                <div>{obj.address}</div>
                <div>{obj.hobby}</div>
            </div>
        </>
    )
}

function Simp() {
    return (
        <div>
            <List test={<div>123</div>}>
                <div>123</div>
                <div>123</div>
                <div>123</div>
            </List>
        </div>
    )
}

export default Simp
