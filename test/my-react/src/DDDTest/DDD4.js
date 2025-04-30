import { observer, useLocalObservable } from 'mobx-react-lite'
import { createContext } from 'react'

// const store = {
//   a: 'foo'
// }
// store.a = 'bar'
// <div>{store.a}<div>

function useCounter(initValue) {
    // const [count, setCount] = useState(initValue || 0)
    const store = useLocalObservable(() => ({
        count: initValue,
    }))

    const increment = () => {
        // setCount(count + 1)
        store.count++
    }

    const decrement = () => {
        // setCount(count - 1)
        store.count--
    }

    return { count, increment, decrement }
}

const CounterContext = createContext(useCounter)

const contexts = [CounterContext]

const Domains = composeContainers(contexts)

const ObservedParent = observer(Parent)
const ObservedChildA = observer(ChildA)
const ObservedChildB = observer(ChildB)

function DDD4() {
    return (
        <Domains.Provider>
            <ObservedParent />
        </Domains.Provider>
    )
}

function Parent() {
    const { increment, decrement } = CounterContext.useContainer()

    return (
        <div>
            <ObservedChildA />
            <button onClick={increment}>加 1</button>
            <button onClick={decrement}>减 1</button>
        </div>
    )
}

function ChildA() {
    return (
        <div>
            <ObservedChildB />
        </div>
    )
}

function ChildB() {
    const { count } = CounterContext.useContainer()

    return <div>Current Count: {count}</div>
}

export default DDD4
