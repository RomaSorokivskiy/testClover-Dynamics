import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authSliceAPI'
import useAuth from "../../hooks/useAuth";

import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import {Container} from "@mui/material";

const Login = () => {
    const {id} = useAuth();
    useTitle('ReactTrello: Login')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username,id }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            navigate(`/board`)
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    const content = (
            <main className="login">
                <Container maxWidth={"md"}>
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            className="form__input"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                        <button className="form__submit-button">Sign In</button>
                        <label htmlFor="persist" className="form__persist">
                            <input
                                type="checkbox"
                                className="form__checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust This Device
                        </label>
                    </form>
                </Container>
            </main>
    )

    return content
}
export default Login