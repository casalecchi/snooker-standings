import { createContext, ReactNode, useContext, useMemo } from 'react'
import { PlayersManager, usePlayers } from '../hooks/usePlayers'

interface DataContextType {
    playersManager: PlayersManager
}

const DataContext = createContext<DataContextType>({} as DataContextType)

const DataProvider = ({ children }: { children: ReactNode }) => {
    const playersManager = usePlayers()

    const value = useMemo(() => ({ playersManager }), [playersManager])

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }

export const useDataContext = () => useContext(DataContext)
