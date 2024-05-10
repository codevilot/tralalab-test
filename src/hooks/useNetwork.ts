import { useContext, useEffect } from 'react'
import { metamask } from '../lib/metamask'
import { ErrorContext } from '../store/globalState'
import { networkError } from '../types/networkError'

export const useNetwork = () => {
    const { setError } = useContext(ErrorContext)
    useEffect(() => {
        const initializeProvider = async () => {
            if (!metamask.isMetamaskInstalled) {
                return setError(networkError.NEEDMETA)
            }
            await metamask.connect()
            await metamask.switch()
        }

        initializeProvider()
    }, [setError])
}
