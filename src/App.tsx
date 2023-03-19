import { HashRouter, Route, Routes } from "react-router-dom"
// import reactLogo from './assets/react.svg'
import "./App.css"
import About from "./pages/About"
import Home from "./pages/Main"
import NotFound from "./pages/NotFound"

export function ClearApp() {
    // const [count, setCount] = useState(0)

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export function RoutedApp() {
    return (
        <HashRouter>
            <ClearApp />
        </HashRouter>
    )
}
