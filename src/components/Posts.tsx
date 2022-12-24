import { Stack } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Modal, TextField, Typography, Button, Grid } from '@mui/material';
import { MdDelete, MdEdit, MdAdd } from 'react-icons/md';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { doc, setDoc, deleteDoc, updateDoc, collection, onSnapshot, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "../../firebase";
import Editor from '../../pages/admin/editor/index';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface IPosts {
    posts: {}[];
}

const Posts = (props: IPosts) => {
    const [modalStatus, setModalStatus] = useState(false);
    const [modalShow, setModalShow] = useState('');
    const [editingPost, setEditingPost] = useState({});

    function addMonth(month: number) {
        let date = new Date();
        date.setMonth(date.getMonth() + 2);
        let time = +date;
        return time;
    }

    const handleCreatePostSubmit = async (event: any) => {
        event.preventDefault();

        let id = uuidv4();
        let dateNow = +Date.now()


        if (event.target[0].value !== '' && event.target[2].value) {
            await setDoc(doc(db, "posts", id), {
                count: 0,
                date: dateNow,
                endDate: addMonth(event.target[4].value),
                originUrl: event.target[2].value,
                user: event.target[0].value
            });
            setModalStatus(false)
            setModalShow('')
        };
    }

    const handleDeletePostSubmit = async (id: string) => {
        deleteDoc(doc(db, "posts", id));
    }

    const handleEditUserSubmit = async (event: any) => {
        event.preventDefault();

        updateDoc(doc(db, "posts", editingPost.id), {

        });
        setModalStatus(false)
        setModalShow('')
    }

    return (
        <Stack direction='column' spacing={1}>
            <Button
                variant="contained"
                sx={{ backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                onClick={() => { setModalStatus(true); setModalShow('add') }}
            >+</Button>
            <Stack sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={1.5}>
                {
                    props.posts.map((post) => (
                        <Grid2 xs key={post.id}>
                            <Stack direction='column' fontSize={12} border='3px solid black' borderRadius='10px' padding={.5} height='100%'>
                                <span>{post.id}</span>
                                <span>{post.user}</span>
                                <span>{post.date}</span>
                                <span>{post.endDate}</span>
                                <span>{post.originUrl}</span>
                                <span>{post.count}</span>
                                <button onClick={() => { setModalStatus(true); setModalShow('edit'); setEditingPost({ id: post.id, date: post.date }) }}>Edit</button>
                                <button onClick={() => handleDeletePostSubmit(post.id)}>Delete</button>
                            </Stack>
                        </Grid2>
                    ))
                }
                </Grid2>
            </Stack>
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
                        <form onSubmit={handleCreatePostSubmit}>
                            <Stack
                                spacing={2}
                            >
                                <Typography textAlign={'center'} fontSize={22}>Create Post</Typography>
                                <TextField
                                    fullWidth
                                    type='login'
                                    id="outlined-error"
                                    label="User"
                                />
                                <TextField
                                    fullWidth
                                    type='text'
                                    id="outlined-error"
                                    label="Url"
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        defaultValue={1}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={11}>11</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
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
                                        value={editingPost.login}
                                    />
                                    <TextField
                                        fullWidth
                                        type='password'
                                        id="outlined-error"
                                        label="Password"
                                        defaultValue={editingPost.password}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        id="outlined-error"
                                        label="Name"
                                        defaultValue={editingPost.name}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        id="outlined-error"
                                        label="Phone number"
                                        defaultValue={editingPost.phoneNumber}
                                    />
                                    <Button type='submit' size='large' variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Update</Button>
                                </Stack>
                            </form>
                            : ''}
                </Stack>
            </Modal>
        </Stack >
    )
}

export default Posts;