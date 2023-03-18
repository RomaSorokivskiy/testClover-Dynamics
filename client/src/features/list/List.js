import {useGetListsQuery,useDeleteListMutation} from "./listSliceAPI";
import {useGetCardsQuery, useAddNewCardMutation} from "./card/cardSliceAPI";
import Card from "./card/Card"
import {Button, Container} from "@mui/material";
import {AiFillEdit} from "react-icons/ai"
import {useDrop} from "react-dnd";
import itemsTypes from "../../items/itemsTypes";
import ListFormEdit from "./listFormEdit";
import {useState} from "react";

const List = ({listId, lists}) => {
    const {
        data: cards,
        isSuccess,
        isError,
        error
    } = useGetCardsQuery('getCards', {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [deleteList] = useDeleteListMutation();
    const [addNewCard] = useAddNewCardMutation();

    const [modalActive, setModalActive] = useState(false)

    const {list} = useGetListsQuery("getLists", {
        selectFromResult: ({data}) => ({
            list:data?.entities[listId]
        }),
    })
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: itemsTypes.CARD,
        drop: () => ({ id: list.id }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    let content;
    if (isError) {
        content = (
            <main>
                <Container maxWidth={"md"}>
                    <p className="errmsg">{error?.data?.message}</p>
                </Container>
            </main>
        )
    }

    const deleteListClick = async () => {
        deleteList({id:listId})
    }

    const newCard = async(e) =>{
        e.preventDefault()
        addNewCard({list:listId})
    }

    if(isSuccess) {
        const created = new Date(list.date).toLocaleDateString('en-US',{day:"numeric",month:"numeric", year:"numeric"})
        const {ids,entities} = cards
        let filtered = ids.filter(el => entities[el].list === listId)
        const cardContent = ids?.length && filtered.map(listId => <Card key={listId} cardId={listId} list={list} lists={lists}/>)
        content = (
            <div className="List" ref={drop}>
                <h4>{list.title} <button onClick={() => setModalActive(true)} style={{borderStyle:"none", background:"none", color:"#eeeeee", cursor:"pointer"}}><AiFillEdit style={{width:"25px"}}/></button></h4>
                <div className="card-wrapper">
                    {cardContent}
                </div>
                <Button onClick={(e) => newCard(e)}>Create Card</Button>
                <Button onClick={() => deleteListClick()}>Delete List</Button>
                <p>{created}</p>
                <ListFormEdit listEl={list} active={modalActive} setActive={setModalActive}/>
            </div>
        )
    }else return null
    return content
}

export default List;