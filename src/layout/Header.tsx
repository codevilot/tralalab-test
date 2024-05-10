import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import { Profile } from '../components/Profile'
const TYPOGRAPY_STYLE = {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}
export function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={TYPOGRAPY_STYLE}
                    >
                        TralaLab
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    ></Box>
                    <IconButton color="inherit">
                        <Profile />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
