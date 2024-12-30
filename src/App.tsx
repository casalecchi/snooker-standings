import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Home } from './components/Home'
import { darkTheme } from './configurations/theme'

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme>
                <Home />
            </CssBaseline>
        </ThemeProvider>
    )
}

export default App
