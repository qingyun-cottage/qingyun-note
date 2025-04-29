import { useState } from 'react'

const useMyState = initialValue => {
    const [state, setState] = useState(initialValue)

    // 定义一个方法来更新状态
    const mySet = obj => {
        // 更新状态，合并现有状态和新提供的对象
        setState(prevState => ({
            ...prevState,
            ...obj,
        }))
    }

    return [state, setState, mySet]
}

export default useMyState
