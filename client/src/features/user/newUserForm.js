import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./userApiSlice"
import { useNavigate } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import {Container,Button} from "@mui/material";
import {CiSaveUp2} from "react-icons/ci";

const USER_REGEX = /^[A-z]{3,20}$/

const NewUserForm = () => {
    useTitle('ReactTrello: New User')
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])



    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            navigate('/board')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)

    const canSave = [validUsername].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''


    const content = (
        <main>
            <Container maxWidth={"md"}>
                <p className={errClass}>{error?.data?.message}</p>
                <form className="form" onSubmit={onSaveUserClicked}>
                    <div className="form__title-row">
                        <h2>Create account</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                disabled={!canSave}
                            >
                                <CiSaveUp2/>
                            </button>
                        </div>
                    </div>
                    <label className="form__label" htmlFor="username" style={{marginTop:"10px"}}>
                        Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                </form>
            </Container>
        </main>
    )

    return content
}
export default NewUserForm;