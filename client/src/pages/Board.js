import {useAddNewListMutation, useGetListsQuery} from "../features/list/listSliceAPI";
import useTitle from "../hooks/useTitle";
import {Container} from "@mui/material";
import useAuth from "../hooks/useAuth";
import List from "../features/list/List"

import {Button} from "@mui/material";

const Board = () => {
    useTitle("ReactTrello: My Board")
    const {id} = useAuth();
    const {
        data: lists,
        isSuccess,
        isError,
        error
    } = useGetListsQuery('getLists', {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [addNewList] = useAddNewListMutation()
    let content;
    if (isError) {
        content = (
            <main>
                <Container maxWidth={"md"}>
                    <Button onClick={(e) => onSaveListClicked(e)}>
                        Create List
                    </Button>
                    <p className="errmsg">{error?.data?.message}</p>
                </Container>
            </main>
        )
    }

    const onSaveListClicked = async (e) => {
        e.preventDefault()
        await addNewList({user:id})
    }

    if(isSuccess && lists){
        const {ids,entities} = lists
        let filtered = ids.filter(el => entities[el].user === id)
        const contentList = ids?.length && filtered.map(listId => <List key={listId} listId={listId} lists={filtered}/>)
        content = (
            <main>
                <Container maxWidth={"md"} style={{height:"100%", display:"flex",alignItems:"center",justifyItems:"space-evenly", flexDirection:"column"}}>
                    <div>
                        <Button onClick={(e) => onSaveListClicked(e)}>
                            Create List
                        </Button>
                    </div>
                    <div className="wrapper">
                        {contentList}
                    </div>
                </Container>
            </main>
        )
    }
    return content
}
export default Board;