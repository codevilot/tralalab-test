import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { networkError } from '../types/networkError'
import { BrowserProvider, JsonRpcSigner } from 'ethers'

export const EthProviderContext = createContext<{
    signer: JsonRpcSigner | undefined
    setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
    error: keyof typeof networkError
    setError: Dispatch<SetStateAction<keyof typeof networkError>>
    ethProvider: BrowserProvider | undefined
    setEthProvider: Dispatch<SetStateAction<BrowserProvider | undefined>>
    wallet: string | undefined
    setWallet: Dispatch<SetStateAction<string | undefined>>
}>({
    signer: undefined,
    setSigner: () => null,
    error: networkError.PREPROCESS,
    setError: () => null,
    ethProvider: undefined,
    setEthProvider: () => null,
    wallet: undefined,
    setWallet: () => null,
})

export function GlobalStateProvider(props: {
    children: React.ReactNode | null
}) {
    const [wallet, setWallet] = useState<string | undefined>()
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>()
    const [error, setError] = useState<keyof typeof networkError>(
        networkError.PREPROCESS
    )
    const [ethProvider, setEthProvider] = useState<
        BrowserProvider | undefined
    >()

    return (
        <EthProviderContext.Provider
            value={{
                signer,
                setSigner,
                error,
                setError,
                ethProvider,
                setEthProvider,
                wallet,
                setWallet,
            }}
        >
            {props.children}
        </EthProviderContext.Provider>
    )
}
