import {useState} from "react";
import {useUpdateCardMutation} from "./cardSliceAPI";
import {Button} from "@mui/material";

const CardFormEdit = ({cardEl,active,setActive}) => {
    const [title, setTitle] = useState(cardEl.title)
    const [description, setDescription] = useState(cardEl.description)

    const [updateCard] = useUpdateCardMutation()
    const onSaveCardClicked = async (e) => {
        e.preventDefault()
        await updateCard({ id: cardEl.id, list: cardEl.list, title:title, description:description})
        setActive(false)
    }
    return(
        <div className={active ? "editForm active" : "editForm unactive"} draggable={"false"}>
            <form className="editForm"onSubmit={(e) => onSaveCardClicked(e)}>
                <label>Title: </label>
                <input
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description: </label>
                <input
                    className="descr"
                    type="text"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={onSaveCardClicked}>
                    Save
                </Button>
                <Button onClick={() => setActive(false)}>Close</Button>
            </form>
        </div>
    )
}
export default CardFormEdit;