import { useContext } from 'react'
import { useListener } from '../hooks/useListener'
import { ErrorContext } from '../store/globalState'
import { networkError } from '../types/networkError'
import { useNetwork } from '../hooks/useNetwork'
import { metamask } from '../lib/metamask'

function NeedMetaError() {
    const { setError } = useContext(ErrorContext)
    const handleFocus = async () => {
        if (!metamask.isMetamaskInstalled) return
        setError(networkError.PREPROCESS)
        await metamask.connect()
        await metamask.switch()
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
    const { error } = useContext(ErrorContext)
    useNetwork()
    if (error === networkError.NEEDMETA) return <NeedMetaError />
    return null
}
