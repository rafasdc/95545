import { BrowserRouter } from "react-router-dom"
import Body from "./Body"
import Menu from "./components/Menu"

const App = () => (
    <BrowserRouter>
        <Menu />
        <Body />
    </BrowserRouter>
)

export default App
