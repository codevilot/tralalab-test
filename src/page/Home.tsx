import { useContext } from 'react'
import { ErrorAlert } from '../components/ErrorAlert'
import { useNetwork } from '../hooks/useNetwork'
import { EthProviderContext } from '../store/globalState'
import { networkError } from '../types/networkError'
import { Assets } from '../layout/Assets'

export function Home() {
    const { error } = useContext(EthProviderContext)
    useNetwork()
    if (error !== networkError.NORMAL) return <ErrorAlert />
    return <Assets />
}
