import Main from "./components/Main";
import Board from "./components/Board";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";

const App = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="home" element={<Main/>}/>
                    <Route path="board" element={<Board/>}/>
                </Route>
            </Routes>
        </>
    )
}
export default App;