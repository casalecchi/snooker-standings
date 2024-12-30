import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#26C485',
        },
        secondary: {
            main: '#A3E7FC',
        },
    },
    typography: {
        fontFamily: 'Oswald, Roboto',
    },
})
