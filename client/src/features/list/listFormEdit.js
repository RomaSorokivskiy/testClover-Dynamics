import {useState} from "react";
import {useUpdateListMutation} from "./listSliceAPI";
import {Button} from "@mui/material";

const ListFormEdit = ({listEl,active,setActive}) => {
    const [title, setTitle] = useState(listEl.title)

    const [updateList] = useUpdateListMutation()
    const onSaveListClicked = async (e) => {
        e.preventDefault()
        await updateList({ id: listEl.id, user: listEl.user, title:title })
        setActive(false)
    }
    return(
        <div className={active ? "editForm active" : "editForm unactive"}>
            <form className="editForm"onSubmit={(e) => onSaveListClicked(e)}>
                <label>Title:</label>
                <input
                    type="text"
                    id="list-title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button onClick={onSaveListClicked}>
                    Save
                </Button>
                <Button onClick={() => setActive(false)}>Close</Button>
            </form>
        </div>
    )
}
export default ListFormEdit;