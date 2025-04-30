import { useState } from 'react'

function useCounter() {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return [count, increment, decrement]
}

function useCounterA() {
    const [count, increment, decrement] = useCounter()

    const reset = () => {}

    return [count, increment, decrement, reset]
}

function A() {
    const [count, increment, decrement] = useCounter()

    return (
        <div>
            <div>{count}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

export function DDD2() {
    return (
        <div>
            <A />
        </div>
    )
}
