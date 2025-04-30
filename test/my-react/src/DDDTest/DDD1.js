import { createContext, useContext, useEffect, useState } from 'react'

const defaultvalue = {
    a: 'foo',
}

const Context = createContext(defaultvalue)

function Parent() {
    const [state, setState] = useState(defaultvalue)

    useEffect(() => {
        setTimeout(() => {
            setState({ a: 'bar' })
        }, 2 * 1000)
    }, [])

    return (
        <Context.Provider value={state}>
            <ChildA>
                <ChildB />
            </ChildA>
        </Context.Provider>
    )
}

function ChildA(props) {
    const { children } = props

    return <div>{children}</div>
}

function ChildB() {
    const { a } = useContext(Context)
    return <div>This is {a}</div>
}

function DDDTest1() {
    return (
        <div>
            <Parent />
        </div>
    )
}

export default DDDTest1
