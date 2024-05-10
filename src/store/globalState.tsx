import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { networkError } from '../types/networkError'

export const ErrorContext = createContext<{
    error: keyof typeof networkError
    setError: Dispatch<SetStateAction<keyof typeof networkError>>
}>({ error: networkError.PREPROCESS, setError: () => null })

export function GlobalStateProvider(props: {
    children: React.ReactNode | null
}) {
    const [error, setError] = useState<keyof typeof networkError>(
        networkError.PREPROCESS
    )

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {props.children}
        </ErrorContext.Provider>
    )
}
