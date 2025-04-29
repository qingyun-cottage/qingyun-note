import { createContext, useContext } from 'react'

function Detail({ onActive }) {
    return (
        <div>
            <button
                onClick={() => {
                    onActive(123)
                }}
            >
                Detail
            </button>
        </div>
    )
}

const TestContext = createContext(2)

function Inner({ children }) {
    const test = useContext(TestContext)
    return (
        <TestContext.Provider value={test + 1}>
            <div>{test}</div>
            {children}
        </TestContext.Provider>
    )
}

export default function Test1() {
    const handleActive = e => {
        // onActive()
        // console.log('123', 123)
        console.log('e', e)
    }

    return (
        <div>
            <h1>Test1</h1>
            <Detail onActive={handleActive} />
            <Inner>
                <Inner>
                    <Inner></Inner>
                </Inner>
            </Inner>
        </div>
    )
}
