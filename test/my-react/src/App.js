import logo from './logo.svg'
import './App.css'
import Simp from './components/Simp'
import Test1 from './components/Test1'
import DDD1 from './DDDTest/DDD1'
import { DDD2 } from './DDDTest/DDD2'
import DDD3 from './DDDTest/DDD3'
// import DDD4 from './DDDTest/DDD4'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {/* <Simp /> */}
                {/* <Test1 /> */}
                <div className="ddd_box">
                    <DDD1 />
                    <DDD2 />
                    <DDD3 />
                    {/* <DDD4 /> */}
                </div>
            </header>
        </div>
    )
}

export default App
