import { AppBar } from '@mui/material'
import './App.css'
import { Home } from './page/Home'
import { GlobalStateProvider } from './store/globalState'
import { Header } from './layout/Header'
// https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask

const App = () => {
    return (
        <GlobalStateProvider>
            <Header />
            <Home />
        </GlobalStateProvider>
    )
}

export default App
