import { useEffect } from 'react';

import { collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { db } from '../../firebase';
import { setAdmins } from '../../redux/slices/AdminSlice';

const UserDatas = (props: any) => {
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.admin.role)

    useEffect(() => {
        (async function () {
            await onSnapshot(collection(db, "users"), (docs) => {
                let arr: any = [];
                docs.docs.forEach(doc => {
                    arr.push({ login: doc.id, ...doc.data() })
                })
                dispatch(setAdmins(arr))
            });
        }());
    }, [role])

    return (
        <>
            {props.children}
        </>
    )
}

export default UserDatas