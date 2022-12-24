import Head from 'next/head'
import Link from 'next/link'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

export default function Home() {
    return (
        <div className='container'>
            <Head>
                <title>Route Rating</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Stack
                height='100vh'
                alignItems='center'
                justifyContent='center'
            >
                <Stack
                    sx={{ padding: '20px 30px', border: '2px solid black', borderRadius: '0px 20px' }}
                    spacing={3}
                    className='border'
                >
                    <Typography className='title' textAlign={'center'} fontSize={22}>Route Rating</Typography>
                    <Stack
                        spacing={1.5}
                        className='div2'
                    >
                        <Typography className='descr' alignItems='center' fontSize={18}>About advertising write to these contacts:</Typography>
                        <Stack
                            spacing={0.5}
                            alignItems='center'
                            className='div3'
                        >
                            <Typography sx={{ '&:hover': { textDecoration: 'underline', color: 'red' } }}>
                                <Link href='https://t.me/little_7o7' target="_blank" rel="noopener noreferrer">Telegram</Link>
                            </Typography>
                            <Typography sx={{ '&:hover': { textDecoration: 'underline', color: 'red' } }}>
                                <Link href='https://www.instagram.com/little_7o7/' target="_blank" rel="noopener noreferrer">Instagram</Link>
                            </Typography >
                            <Typography
                                sx={{ '&:hover': { textDecoration: 'underline', color: 'red' }, cursor: 'pointer' }}
                                onClick={() => navigator.clipboard.writeText('+998330737477')}
                            >
                                +998330737477
                            </Typography>
                            <Typography
                                sx={{ '&:hover': { textDecoration: 'underline', color: 'red' }, cursor: 'pointer' }}
                                onClick={() => navigator.clipboard.writeText('munisxonovmaxmudxon@gmail.com')}
                            >
                                munisxonovmaxmudxon@gmail.com
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}