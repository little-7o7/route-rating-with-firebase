import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import { useAppDispatch } from '../../redux/hooks';
import { clearAdmin } from "../../redux/slices/AdminSlice";
import { useRouter } from 'next/router';

interface IAdminsLayout {
    children: any;
    role: string;
    active: string;
}

const AdminsLayout = (props: IAdminsLayout) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <Stack direction='row' height='100vh' width='100%'>
            <Stack sx={{ background: 'black' }} height='100%' width='25%' padding='15px 8px 15px 15px'>
                <Stack sx={{ background: 'white' }} height='100%' width='100%' justifyContent='space-between' borderRadius='10px' padding='10px'>
                    <Stack spacing={1}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={props.active === 'rating' ?
                                { backgroundColor: '#3C4043', borderRadius: '10px', '&:hover': { backgroundColor: '#3C4043' } }
                                : { backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                            onClick={() => router.push(`/admin/${props.role}/`)}
                        >Rating</Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={props.active === 'clients' ?
                                { backgroundColor: '#3C4043', borderRadius: '10px', '&:hover': { backgroundColor: '#3C4043' } }
                                : { backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                            onClick={() => router.push(`/admin/${props.role}/clients`)}
                        >Clients</Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={props.active === 'posts' ?
                                { backgroundColor: '#3C4043', borderRadius: '10px', '&:hover': { backgroundColor: '#3C4043' } }
                                : { backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                            onClick={() => router.push(`/admin/${props.role}/posts`)}
                        >Posts</Button>
                    </Stack>
                    <Stack spacing={1}>
                        {props.role === 'developer' ?
                            <Button
                                fullWidth
                                variant="contained"
                                sx={props.active === 'users' ?
                                    { backgroundColor: '#3C4043', borderRadius: '10px', '&:hover': { backgroundColor: '#3C4043' } }
                                    : { backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                                onClick={() => router.push(`/admin/${props.role}/users`)}
                            >Users</Button>
                            : ''
                        }
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'black', borderRadius: '10px', '&:hover': { backgroundColor: 'black' } }}
                            onClick={() => dispatch(clearAdmin())}
                        >Log out</Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack sx={{ background: 'black' }} height='100%' width='75%' alignItems='stretch' padding='15px 15px 8px 10px'>
                <Stack sx={{ background: 'white' }} height='100%' width='100%' borderRadius='10px' padding='10px'>{props.children}</Stack>
            </Stack>
        </Stack >
    )
}

export default AdminsLayout;