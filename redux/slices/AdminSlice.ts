import { createSlice } from '@reduxjs/toolkit'

interface IAdminState {
    admins: {}[];
    admin: object;
    role: string;
}

const initialState: IAdminState = {
    admins: [],
    admin: {},
    role: '',
}

export const AdminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        setAdmin: (state, action) => {
            state.admin = action.payload
        },
        setAdmins: (state, action) => {
            state.admins = action.payload
        },
        clearAdmin: (state) => {
            state.admins = []
            state.admin = {}
            state.role = ''
        },
    },
})

export const { setRole, setAdmin, setAdmins, clearAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;