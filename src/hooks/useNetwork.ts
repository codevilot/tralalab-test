import { useContext, useEffect } from 'react'
import { metamask } from '../lib/metamask'
import { EthProviderContext } from '../store/globalState'
import { networkError } from '../types/networkError'

export const useNetwork = () => {
    const { setError, setWallet, setEthProvider, setSigner } =
        useContext(EthProviderContext)
    useEffect(() => {
        const initializeProvider = async () => {
            try {
                if (!metamask.isMetamaskInstalled)
                    return setError(networkError.NEEDMETA)

                const { wallet, provider, signer } = await metamask.connect()
                setWallet(wallet)
                setEthProvider(provider)
                setSigner(signer)
                await metamask.switch()

                return setError(networkError.NORMAL)
            } catch (err) {
                console.log(err)
            }
        }

        initializeProvider()
    }, [setError, setWallet])
}
