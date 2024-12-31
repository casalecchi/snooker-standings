import { Button, List, ListItem, Stack, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { useDataContext } from '../context/DataContext'
import { MatchDialog } from './MatchDialog'
import { Row } from './Row'

export const Home: FC = () => {
    const { playersManager } = useDataContext()
    const { addPlayer, sortedPlayers } = playersManager
    const [playerName, setPlayerName] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

    const handleAdd = () => {
        addPlayer({
            id: crypto.randomUUID(),
            name: playerName,
            points: 0,
            wins: 0,
            scoreDiff: 0,
        })
        setPlayerName('')
    }

    return (
        <Stack alignItems={'center'}>
            <Stack direction={'row'} p={2} spacing={2} width={'100%'} maxWidth={'60rem'}>
                <TextField
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    placeholder={'Adcione um jogador'}
                    sx={{ width: '70%' }}
                />
                <Button
                    disabled={!playerName.trim()}
                    onClick={handleAdd}
                    variant={'contained'}
                    sx={{ width: '30%' }}
                >
                    {'Adicionar'.toUpperCase()}
                </Button>
            </Stack>
            {sortedPlayers.length > 0 && (
                <>
                    <List
                        sx={{
                            maxWidth: '60rem',
                            width: '100%',
                            overflowY: 'auto',
                            height: '60vh',
                        }}
                    >
                        {sortedPlayers.map((player, index) => (
                            <ListItem
                                key={player.id}
                                divider
                                sx={{
                                    backgroundColor: index == 0 ? 'primary.dark' : 'transparent',
                                }}
                            >
                                <Row index={index} player={player} />
                            </ListItem>
                        ))}
                    </List>
                    <Button variant={'contained'} onClick={() => setOpenDialog(true)}>
                        {'Adicionar partida'.toUpperCase()}
                    </Button>
                    <MatchDialog open={openDialog} setOpen={setOpenDialog} />
                </>
            )}
        </Stack>
    )
}
