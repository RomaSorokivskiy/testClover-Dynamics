import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {apiSlice} from "../../../app/api/apiSlice"

const cardAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1,
    selectId: (card) => card.id,
})
const initialState = cardAdapter.getInitialState()

export const cardSliceAPI = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCards: builder.query({
            query: () => ({
                url: '/card',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedCard = responseData.map(card => {
                    card.id = card._id
                    return card
                });
                return cardAdapter.setAll(initialState, loadedCard)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Card', id: 'CARD' },
                        ...result.ids.map(id => ({ type: 'Card', id }))
                    ]
                } else return [{ type: 'Card', id: 'CARD' }]
            }
        }),
        addNewCard: builder.mutation({
            query: initialCard => ({
                url:"/card",
                method: "POST",
                body: {
                    ...initialCard,
                }
            }),
            invalidatesTags: [
                { type: 'CARD', id: "CARD" }
            ]
        }),
        updateCard:builder.mutation({
            query: initialCard => ({
                url:"/card",
                method:"PATCH",
                body: {
                    ...initialCard
                }
            }),
            invalidatesTags: (res,e,arg) =>[
                { type: 'CARD', id: arg.id }
            ]
        }),
        deleteCard:builder.mutation({
            query: ({id}) => ({
                url:"/card",
                method:"DELETE",
                body: {id}
            }),
            invalidatesTags: (res,e,arg) => [
                { type: 'CARD', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCardsQuery,
    useAddNewCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation
} = cardSliceAPI

export const selectCardsResult = cardSliceAPI.endpoints.getCards.select()

const selectCardsData = createSelector(
    selectCardsResult,
    cardResult => cardResult.data
)

export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardIds
} = cardAdapter.getSelectors(state => selectCardsData(state) ?? initialState)