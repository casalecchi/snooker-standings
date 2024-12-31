import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Home } from './components/Home'
import { darkTheme } from './configurations/theme'
import { DataProvider } from './context/DataContext'
import { DeviceProvider } from './context/DeviceContext'

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme>
                <DataProvider>
                    <DeviceProvider>
                        <Home />
                    </DeviceProvider>
                </DataProvider>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default App
