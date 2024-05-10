import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { networkError } from '../types/networkError'
import { ethers } from 'ethers'

// export const ErrorContext = createContext<{
//     error: keyof typeof networkError
//     setError: Dispatch<SetStateAction<keyof typeof networkError>>
// }>({ error: networkError.PREPROCESS, setError: () => null })

export const EthProviderContext = createContext<{
    error: keyof typeof networkError
    setError: Dispatch<SetStateAction<keyof typeof networkError>>
    ethProvider: ethers.AbstractProvider | undefined
    setEthProvider: Dispatch<
        SetStateAction<ethers.AbstractProvider | undefined>
    >
    wallet: string | undefined
    setWallet: Dispatch<SetStateAction<string | undefined>>
}>({
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
    const [error, setError] = useState<keyof typeof networkError>(
        networkError.PREPROCESS
    )
    const [ethProvider, setEthProvider] = useState<
        ethers.AbstractProvider | undefined
    >()

    return (
        <EthProviderContext.Provider
            value={{
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
