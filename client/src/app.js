import Main from "./pages/Main";
import Layout from "./components/Layout";
import NewUserForm from "./features/user/newUserForm";
import {Routes, Route} from "react-router-dom";
import Login from "./features/auth/Login";
import Board from "./pages/Board";
import useTitle from "./hooks/useTitle";

const App = () => {
    useTitle("ReactTrello: Home")
    return(
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/board" element={<Board/>}/>
                    <Route path="/register" element={<NewUserForm/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
            </Routes>
        </>
    )
}
export default App;