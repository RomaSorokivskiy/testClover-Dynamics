import {useGetCardsQuery, useUpdateCardMutation,useDeleteCardMutation} from "./cardSliceAPI";
import {useDrag} from "react-dnd";
import {memo, useState} from "react";
import {Button} from "@mui/material";
import itemsTypes from "../../../items/itemsTypes";
import {AiFillEdit} from "react-icons/ai";
import CardFormEdit from "./cardFormEdit";

const Card = ({cardId}) => {
    const {cards} = useGetCardsQuery("getCards", {
        selectFromResult: ({data}) => ({
            cards:data?.entities[cardId]
        }),
    })
    const [updateCard] = useUpdateCardMutation();
    const [deleteCard] = useDeleteCardMutation();

    const [modalActive, setModalActive] = useState(false)
    const [{isDragging},drag] = useDrag({
        type:itemsTypes.CARD,
        item: cards,
        end: (item,monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                updateCard({id:item.id,title:item.title,description:item.description,list: dropResult.id})
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    const deleteListCard = async (id) => {
        deleteCard({id})
    }
    const created = new Date(cards.date).toLocaleDateString('en-US',{day:"numeric",month:"numeric", year:"numeric"})

    return(
        <div>
            <div className="Card" ref={drag}>
                <h5>{cards.title} <button onClick={() => setModalActive(true)} style={{borderStyle:"none", background:"none", color:"black", cursor:"pointer"}}><AiFillEdit style={{width:"25px"}}/></button></h5>
                <p>{cards.description}</p>
                <p>{created}</p>
                <Button onClick={() => deleteListCard(cardId)}>Delete</Button>
            </div>
            <CardFormEdit cardEl={cards} active={modalActive} setActive={setModalActive}/>
        </div>
    )
}

const memoizedCard = memo(Card)

export default memoizedCard;