import './App.css'
import { ErrorAlert } from './components/ErrorAlert'
import { GlobalStateProvider } from './store/globalState'
// https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask

const App = () => {
    return (
        <GlobalStateProvider>
            <ErrorAlert />
        </GlobalStateProvider>
    )
}

export default App
