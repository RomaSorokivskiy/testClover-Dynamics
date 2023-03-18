import { store } from '../../app/store'
import { listSliceAPI} from '../list/listSliceAPI'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(listSliceAPI.util.prefetch('getLists', 'List', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch