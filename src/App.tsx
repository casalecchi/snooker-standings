import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Home } from './components/Home'
import { darkTheme } from './configurations/theme'
import { DeviceProvider } from './context/DeviceContext'

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme>
                <DeviceProvider>
                    <Home />
                </DeviceProvider>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default App
