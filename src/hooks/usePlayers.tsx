import { useEffect, useState } from 'react'
import { Player } from '../models/player'

export interface PlayersManager {
    addPlayer: (player: Player) => void
    sortedPlayers: Player[]
    removePlayer: (player: Player) => void
    updatePlayer: (player: Player) => void
}

export const usePlayers = (): PlayersManager => {
    const [players, setPlayers] = useState<Player[]>([])
    const [sortedPlayers, setSortedPlayers] = useState<Player[]>([])

    const addPlayer = (player: Player) => {
        setPlayers((prev) => [...prev, player])
    }

    const removePlayer = (player: Player) => {
        setPlayers((prev) => prev.filter((p) => p.id != player.id))
    }

    const updatePlayer = (player: Player) => {
        setPlayers((prev) => prev.map((p) => (p.id == player.id ? player : p)))
    }

    useEffect(() => {
        setPlayers(JSON.parse(localStorage.getItem('players') ?? '{}'))
    }, [])

    useEffect(() => {
        setSortedPlayers(
            Array.isArray(players)
                ? [...players].sort((a, b) => {
                      if (b.points !== a.points) return b.points - a.points
                      if (b.wins !== a.wins) return b.wins - a.wins
                      return b.scoreDiff - a.scoreDiff
                  })
                : []
        )
    }, [players])

    useEffect(() => {
        if (sortedPlayers.length) localStorage.setItem('players', JSON.stringify(sortedPlayers))
    }, [sortedPlayers])

    return { addPlayer, sortedPlayers, removePlayer, updatePlayer }
}
