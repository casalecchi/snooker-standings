import { Add, Close, Remove } from '@mui/icons-material'
import {
    Autocomplete,
    Button,
    Dialog,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useDataContext } from '../context/DataContext'
import { useDeviceContext } from '../context/DeviceContext'
import { Player } from '../models/player'

interface MatchDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MatchDialog: FC<MatchDialogProps> = ({ open, setOpen }) => {
    const { mobile } = useDeviceContext()
    const { playersManager } = useDataContext()
    const { updatePlayer } = playersManager
    const [player1, setPlayer1] = useState<Player>()
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [player2, setPlayer2] = useState<Player>()

    const handleClick = () => {
        if (!player1 || !player2) return

        const scoreDiff = player1Score - player2Score
        const winner = scoreDiff > 0 ? 1 : 2

        const calculateUpdatedPlayer = (player: Player, isWinner: boolean): Player => ({
            ...player,
            points: (player.points ?? 0) + (isWinner ? 2 : 1),
            wins: isWinner ? (player.wins ?? 0) + 1 : (player.wins ?? 0),
            scoreDiff:
                (player.scoreDiff ?? 0) +
                (isWinner
                    ? winner == 1
                        ? scoreDiff
                        : -scoreDiff
                    : winner == 2
                      ? scoreDiff
                      : -scoreDiff),
        })

        const updatedPlayer1 = calculateUpdatedPlayer(player1, winner === 1)
        const updatedPlayer2 = calculateUpdatedPlayer(player2, winner === 2)

        updatePlayer(updatedPlayer1)
        updatePlayer(updatedPlayer2)

        setPlayer1(undefined)
        setPlayer2(undefined)
        setPlayer1Score(0)
        setPlayer2Score(0)

        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            fullScreen={mobile}
            maxWidth={'lg'}
        >
            <IconButton
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 10, top: 10 }}
            >
                <Close />
            </IconButton>
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
                height={'100dvh'}
                spacing={2}
                p={2}
            >
                <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    direction={'row'}
                    width={'100%'}
                >
                    <Stack alignItems={'center'} width={'45%'}>
                        <Autocomplete
                            getOptionLabel={(option) => option.name}
                            onChange={(_, player) => setPlayer1(player ?? undefined)}
                            options={playersManager.sortedPlayers}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    hiddenLabel
                                    placeholder="Selecione um jogador"
                                />
                            )}
                        />
                        <Typography fontSize={'3rem'}>{player1Score}</Typography>
                        <Stack direction={'row'}>
                            <IconButton onClick={() => setPlayer1Score((prev) => prev + 1)}>
                                <Add />
                            </IconButton>
                            <IconButton onClick={() => setPlayer1Score((prev) => prev - 1)}>
                                <Remove />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Typography fontSize={'2rem'} mt={2}>
                        X
                    </Typography>
                    <Stack alignItems={'center'} justifyContent={'center'} width={'45%'}>
                        <Autocomplete
                            getOptionLabel={(option) => option.name}
                            onChange={(_, player) => setPlayer2(player ?? undefined)}
                            options={playersManager.sortedPlayers}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    hiddenLabel
                                    placeholder="Selecione um jogador"
                                />
                            )}
                        />
                        <Typography fontSize={'3rem'}>{player2Score}</Typography>
                        <Stack direction={'row'}>
                            <IconButton onClick={() => setPlayer2Score((prev) => prev + 1)}>
                                <Add />
                            </IconButton>
                            <IconButton onClick={() => setPlayer2Score((prev) => prev - 1)}>
                                <Remove />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
                <Button disabled={!player1 && !player2} variant="contained" onClick={handleClick}>
                    {'Adicionar'.toUpperCase()}
                </Button>
            </Stack>
        </Dialog>
    )
}
