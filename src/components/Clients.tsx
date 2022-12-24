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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { doc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface IClients {
    clients: {}[];
}

const Clients = (props: IClients) => {
    const router = useRouter();
    const [modalStatus, setModalStatus] = useState(false);
    const [modalShow, setModalShow] = useState('');
    const [editingUser, setEditingUser] = useState({});

    const handleCreateUserSubmit = async (event: any) => {
        event.preventDefault();

        if (event.target[0].value !== '' && event.target[2].value !== '' && event.target[4].value !== '' && event.target[6].value !== '') {
            await setDoc(doc(db, "clients", event.target[0].value), {
                password: event.target[2].value,
                name: event.target[4].value,
                phoneNumber: event.target[6].value,
            });
            setModalStatus(false)
            setModalShow('')
        };

    }

    const handleDeleteUserSubmit = async (id: string) => {
        deleteDoc(doc(db, "clients", id));
    }

    const handleEditUserSubmit = async (event: any) => {
        event.preventDefault();

        updateDoc(doc(db, "clients", editingUser.login), {
            password: event.target[2].value,
            name: event.target[4].value,
            phoneNumber: event.target[6].value,
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
                            <TableCell sx={{ fontWeight: 900 }} align="right">Name</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">Password</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">Phone Number</TableCell>
                            <TableCell sx={{ fontWeight: 900 }} align="right">
                                Actions
                                <IconButton onClick={() => { setModalStatus(true); setModalShow('add') }} aria-label="delete">
                                    <MdAdd />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.clients.map((user) => (
                            <TableRow
                                key={user.login}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.login}
                                </TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.password}</TableCell>
                                <TableCell align="right">{user.phoneNumber}</TableCell>
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
                                <TextField
                                    fullWidth
                                    type='text'
                                    id="outlined-error"
                                    label="Name"
                                />
                                <TextField
                                    fullWidth
                                    type='text'
                                    id="outlined-error"
                                    label="Phone Number"
                                />
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
                                    <TextField
                                        fullWidth
                                        type='text'
                                        id="outlined-error"
                                        label="Name"
                                        defaultValue={editingUser.name}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        id="outlined-error"
                                        label="Phone number"
                                        defaultValue={editingUser.phoneNumber}
                                    />
                                    <Button type='submit' size='large' variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Update</Button>
                                </Stack>
                            </form>
                            : modalShow === 'delete' ? 'delete' : ''}
                </Stack>
            </Modal>
        </Stack>
    )
}

export default Clients;