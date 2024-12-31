import { Button, List, ListItem, ListSubheader, Stack, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { Player } from '../models/player'

export const Home: FC = () => {
    const [playerName, setPlayerName] = useState('')
    const [players, setPlayers] = useState<Player[]>([])

    return (
        <Stack alignItems={'center'}>
            <Stack direction={'row'} p={2} spacing={2} width={'100%'} maxWidth={'60rem'}>
                <TextField
                    onChange={(event) => setPlayerName(event.target.value)}
                    placeholder={'Adcione um jogador'}
                    sx={{ width: '70%' }}
                />
                <Button
                    onClick={() =>
                        setPlayers((prev) => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                name: playerName,
                                points: 0,
                                wins: 0,
                                scoreDiff: 0,
                            },
                        ])
                    }
                    variant={'contained'}
                    sx={{ width: '30%' }}
                >
                    {'Adicionar'.toUpperCase()}
                </Button>
            </Stack>
            <List
                sx={{
                    maxWidth: '60rem',
                    width: '100%',
                    overflowY: 'auto',
                    height: '60vh',
                }}
            >
                <ListSubheader>
                    <Stack
                        direction={'row'}
                        spacing={4}
                        alignItems={'center'}
                        justifyContent={'end'}
                    >
                        <Typography>PTS</Typography>
                        <Typography>W</Typography>
                        <Typography>DIFF</Typography>
                    </Stack>
                </ListSubheader>
                {players
                    .sort((a, b) => (a.points > b.points ? 1 : -1))
                    .map((player, index) => (
                        <ListItem key={player.id} divider>
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                p={2}
                                width={'100%'}
                            >
                                <Stack direction={'row'} spacing={2}>
                                    <Typography fontSize={'1.5rem'}>{`${index + 1}°`}</Typography>
                                    <Typography fontSize={'1.5rem'}>{player.name}</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={4}>
                                    <Typography fontSize={'1.2rem'}>{player.points}</Typography>
                                    <Typography fontSize={'1.2rem'}>{player.wins}</Typography>
                                    <Typography fontSize={'1.2rem'}>{player.scoreDiff}</Typography>
                                </Stack>
                            </Stack>
                        </ListItem>
                    ))}
            </List>
        </Stack>
    )
}
