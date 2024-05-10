import './App.css'
import { Home } from './page/Home'
import { GlobalStateProvider } from './store/globalState'
// https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask

const App = () => {
    return (
        <GlobalStateProvider>
            <Home />
        </GlobalStateProvider>
    )
}

export default App
