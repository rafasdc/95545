import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Kanban from "./components/Kanban"

const Body = () => (
    <Routes>
        <Route path="/boatStatus" element={<Kanban />} />
        <Route path="/" element={<Home />} />
    </Routes>
)

export default Body
