import { Stack } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Modal, TextField, Typography, Button } from '@mui/material';
import { MdDelete, MdEdit, MdAdd } from 'react-icons/md';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface IUsers {
    users: {}[];
}

const Users = (props: IUsers) => {
    const router = useRouter();
    const [modalStatus, setModalStatus] = useState(false);
    const [modalShow, setModalShow] = useState('');
    const [editingUser, setEditingUser] = useState({});
    const [role, setRole] = useState('');

    const handleCreateUserSubmit = async (event: any) => {
        event.preventDefault();

        if (event.target[0].value !== '' && event.target[2].value !== '' && role !== '') {
            await setDoc(doc(db, "users", event.target[0].value), {
                password: event.target[2].value,
                role: event.target[4].value,
            });
            setModalStatus(false)
            setModalShow('')
        };

    }

    const handleDeleteUserSubmit = async (id: string) => {
        deleteDoc(doc(db, "users", id));
    }

    const handleEditUserSubmit = async (event: any) => {
        event.preventDefault();

        updateDoc(doc(db, "users", editingUser.login), {
            password: event.target[2].value,
            role: event.target[4].value,
        });
        setModalStatus(false)
        setModalShow('')
    }

    return (
        <Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 900 }}>Login</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">Role</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">Password</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">
                                Actions
                                <IconButton onClick={() => { setModalStatus(true); setModalShow('add') }} aria-label="delete">
                                    <MdAdd />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users.map((user) => (
                            <TableRow
                                key={user.login}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.login}
                                </TableCell>
                                <TableCell align="right">{user.role}</TableCell>
                                <TableCell align="right">{user.password}</TableCell>
                                <TableCell sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }} align="right">
                                    <IconButton onClick={() => { setModalStatus(true); setModalShow('edit'); setEditingUser(user) }} aria-label="delete"><MdEdit /></IconButton>
                                    <span>/</span>
                                    <IconButton onClick={() => handleDeleteUserSubmit(user.login)} aria-label="delete"><MdDelete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={modalStatus}
                onClose={() => { setModalStatus(false); setModalShow('') }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Stack
                    sx={{ padding: '20px 30px', border: '2px solid black', borderRadius: '0px 20px', backgroundColor: 'white' }}
                    width={400}
                >
                    {modalShow === 'add' ?
                        <form onSubmit={handleCreateUserSubmit}>
                            <Stack
                                spacing={2}
                            >
                                <Typography textAlign={'center'} fontSize={22}>Create User</Typography>
                                <TextField
                                    fullWidth
                                    type='login'
                                    id="outlined-error"
                                    label="Login"
                                />
                                <TextField
                                    fullWidth
                                    type='password'
                                    id="outlined-error"
                                    label="Password"
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Role"
                                        onChange={(event) => setRole(event.target.value)}
                                    >
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='editor'>Editor</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button type='submit' size='large' variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Create</Button>
                            </Stack>
                        </form>
                        : modalShow === 'edit' ?
                            <form onSubmit={handleEditUserSubmit}>
                                <Stack
                                    spacing={2}
                                >
                                    <Typography textAlign={'center'} fontSize={22}>Update User</Typography>
                                    <TextField
                                        fullWidth
                                        type='login'
                                        id="outlined-error"
                                        label="Login"
                                        disabled
                                        value={editingUser.login}
                                    />
                                    <TextField
                                        fullWidth
                                        type='password'
                                        id="outlined-error"
                                        label="Password"
                                        defaultValue={editingUser.password}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={editingUser.role}
                                            label="Role"
                                            onChange={(event) => setRole(event.target.value)}
                                        >
                                            <MenuItem value='admin'>Admin</MenuItem>
                                            <MenuItem value='editor'>Editor</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button type='submit' size='large' variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Update</Button>
                                </Stack>
                            </form>
                            : modalShow === 'delete' ? 'delete' : ''}
                </Stack>
            </Modal>
        </Stack>
    )
}

export default Users;