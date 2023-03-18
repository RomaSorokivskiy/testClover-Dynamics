import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

const listAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1,
    selectId: (list) => list.id,
})
const initialState = listAdapter.getInitialState()

export const listSliceAPI = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLists: builder.query({
            query: () => ({
                url: '/list',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedLists = responseData.map(list => {
                    list.id = list._id
                    return list
                });
                return listAdapter.setAll(initialState, loadedLists)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'List', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'List', id }))
                    ]
                } else return [{ type: 'List', id: 'LIST' }]
            }
        }),
        addNewList: builder.mutation({
            query: initialList => ({
                url:"/list",
                method: "POST",
                body: {
                    ...initialList,
                }
            }),
            invalidatesTags: [
                { type: 'LIST', id: "LIST" }
            ]
        }),
        updateList:builder.mutation({
            query: initialList => ({
                url:"/list",
                method:"PATCH",
                body: {
                    ...initialList
                }
            }),
            invalidatesTags: (res,e,arg) =>[
                { type: 'LIST', id: arg.id }
            ]
        }),
        deleteList:builder.mutation({
            query: ({id}) => ({
                url:"/list",
                method:"DELETE",
                body: {id}
            }),
            invalidatesTags: (res,e,arg) => [
                { type: 'LIST', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetListsQuery,
    useAddNewListMutation,
    useUpdateListMutation,
    useDeleteListMutation
} = listSliceAPI

export const selectListsResult = listSliceAPI.endpoints.getLists.select()


const selectListsData = createSelector(
    selectListsResult,
)

export const {
    selectAll: selectAllLists,
    selectById: selectListById,
    selectIds: selectListIds
} = listAdapter.getSelectors(state => selectListsData(state) ?? initialState)