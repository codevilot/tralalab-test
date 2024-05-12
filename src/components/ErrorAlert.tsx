import { useContext } from 'react'
import { useListener } from '../hooks/useListener'
import { networkError } from '../types/networkError'
import { metamask } from '../lib/metamask'
import { EthProviderContext } from '../store/globalState'
import { device } from '../lib/device'
import { Wrapper } from './Wrapper'
import { ErrorTag } from './ErrorTag'
import { Button } from '@mui/material'
const METAMASK_DEEP_LINK = 'https://metamask.app.link/dapp'

const ERROR_MESSAGE = device.isMobile
    ? 'You need to go Metamask browser'
    : 'It seems MetaMask is not installed. Please click the link to install MetaMask.'
function NeedMetaError() {
    const { setError, setWallet, setEthProvider, setSigner } =
        useContext(EthProviderContext)
    const location = window.location.href
    const handleClick = () =>
        window.open(`${METAMASK_DEEP_LINK}/${location}`, '_blank')
    const handleFocus = async () => {
        try {
            if (!metamask.isMetamaskInstalled) return
            const { wallet, provider, signer } = await metamask.connect()
            setWallet(wallet)
            setEthProvider(provider)
            setSigner(signer)
            await metamask.switch()
        } catch (err) {
            return setError(networkError.NEEDMETA)
        }
    }
    useListener('focus', handleFocus)
    return (
        <Wrapper>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ErrorTag>NEED METAMASK:</ErrorTag>
                {ERROR_MESSAGE}
            </div>
            <Button
                variant="contained"
                onClick={handleClick}
                style={{ marginTop: 10 }}
            >
                To Metamask
            </Button>
        </Wrapper>
    )
}

export function ErrorAlert() {
    const { error } = useContext(EthProviderContext)
    console.log(error)
    if (error === networkError.NEEDMETA) return <NeedMetaError />
    return <Wrapper>Check if there is a Metamask connection request</Wrapper>
}
