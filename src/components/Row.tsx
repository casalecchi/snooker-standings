import { DeleteOutline } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useDataContext } from '../context/DataContext'
import { Player } from '../models/player'

interface RowProps {
    index: number
    player: Player
}

export const Row: FC<RowProps> = ({ index, player }) => {
    const {
        playersManager: { removePlayer },
    } = useDataContext()

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            px={1}
            py={2}
            width={'100%'}
        >
            <Stack alignItems={'center'} direction={'row'} spacing={2}>
                <Typography fontSize={'1.5rem'}>{`${index + 1}°`}</Typography>
                <Typography fontSize={'1.5rem'}>{player.name}</Typography>
            </Stack>
            <Stack alignItems={'center'} direction={'row'} spacing={2}>
                <Typography fontSize={'1.2rem'}>{`${player.points} PTS`}</Typography>
                <Typography fontSize={'1.2rem'}>{`${player.wins}V`}</Typography>
                <Typography fontSize={'1.2rem'}>{`${player.scoreDiff} BOLAS`}</Typography>
                <Stack direction={'row'}>
                    <IconButton onClick={() => removePlayer(player)}>
                        <DeleteOutline color="error" />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}
