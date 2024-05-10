import { useContext } from 'react'
import { useListener } from '../hooks/useListener'
import { networkError } from '../types/networkError'
import { metamask } from '../lib/metamask'
import { EthProviderContext } from '../store/globalState'

function NeedMetaError() {
    const { setError, setWallet, setEthProvider } =
        useContext(EthProviderContext)
    const handleFocus = async () => {
        try {
            if (!metamask.isMetamaskInstalled) return
            const { wallet, provider } = await metamask.connect()
            setWallet(wallet)
            setEthProvider(provider)
            await metamask.switch()
        } catch (err) {
            return setError(networkError.NEEDMETA)
        }
    }
    useListener('focus', handleFocus)
    return (
        <div>
            <div>
                It seems MetaMask is not installed. Please click the link to
                install MetaMask.
            </div>
            <div
                onClick={() =>
                    window.open('https://metamask.io/download/', '_blank')
                }
            >
                To Metamask
            </div>
        </div>
    )
}

export function ErrorAlert() {
    const { error } = useContext(EthProviderContext)
    if (error === networkError.NEEDMETA) return <NeedMetaError />
    return null
}
