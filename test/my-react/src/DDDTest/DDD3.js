import { createContext, useContext, useState } from 'react'

function useCounter(initValue) {
    const [count, setCount] = useState(initValue || 0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return { count, increment, decrement }
}

// 封装给hooks⽤的拥有共享能⼒的容器
function createContainer(hooks) {
    const Context = createContext()

    const Provider = ({ initState, children }) => {
        return (
            <Context.Provider value={hooks(initState)}>
                {children}
            </Context.Provider>
        )
    }

    const useContainer = () => {
        return useContext(Context)
    }

    return { Provider, useContainer }
}

const CounterContext = createContainer(useCounter)

function DDD3() {
    return (
        <CounterContext.Provider initState={0}>
            <Parent />
        </CounterContext.Provider>
    )
}

function Parent() {
    const { increment, decrement } = CounterContext.useContainer()

    return (
        <div>
            <ChildA />
            <button onClick={increment}>加 1</button>
            <button onClick={decrement}>减 1</button>
        </div>
    )
}

function ChildA() {
    return (
        <div>
            <ChildB />
        </div>
    )
}

function ChildB() {
    const { count } = CounterContext.useContainer()

    return <div>Current Count: {count}</div>
}

export default DDD3
